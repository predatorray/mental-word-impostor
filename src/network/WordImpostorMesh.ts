import {EventListener} from './MeshNetwork';
import {createPlayer, DecryptionKey, EncodedDeck, Player, PublicKey} from 'mental-poker-toolkit';
import {MeshNetworkEvent, MeshNetworkEvents, MeshNetworkStatus} from './MeshNetwork';
import EventEmitter from "eventemitter3";
import LifecycleManager from "./LifecycleManager";
import Deferred from "../util/Deferred";
import WordImpostorEncodedDeck from "./WordImpostorEncodedDeck";

export interface MentalPokerSettings {
  alice: string;
  bob: string;
  bits?: number;
}

export interface GameStartEvent {
  type: 'start';
  mentalPokerSettings: MentalPokerSettings;
  impostors: number;
}

export type StringEncodedDeck = string[];

export interface DeckStep1Event {
  type: 'deck/step1';
  deck: StringEncodedDeck;
  publicKey: {
    p: string;
    q: string;
  };
}

export interface DeckStep2Event {
  type: 'deck/step2';
  deck: StringEncodedDeck;
}

export interface DeckStep3Event {
  type: 'deck/step3';
  deck: StringEncodedDeck;
}

export interface DeckFinalizedEvent {
  type: 'deck/finalized';
  deck: StringEncodedDeck;
}

export interface DecryptCardEvent {
  type: 'card/decrypt';
  deckOffset: number; // words * players
  aliceOrBob: 'alice' | 'bob';
  decryptionKey: { d: string; n: string };
}

export type MentalPokerEvent =
  | GameStartEvent
  | DeckStep1Event
  | DeckStep2Event
  | DeckStep3Event
  | DeckFinalizedEvent
  | DecryptCardEvent
  ;

function toStringEncodedDeck(deck: EncodedDeck): StringEncodedDeck {
  return deck.cards.map(i => i.toString());
}

function toBigIntEncodedDeck(deck: StringEncodedDeck): EncodedDeck {
  return new EncodedDeck(deck.map(s => BigInt(s)));
}

export interface WordImpostorEvents {
  connected: (peerId: string) => void;
  status: (status: MeshNetworkStatus) => void;
  members: (members: string[]) => void;

  shuffled: () => void;
  card: (wordOffset: number | null) => void;
}

export interface MeshNetworkLike<T> {
  listener: EventListener<MeshNetworkEvents<MeshNetworkEvent<T>>>;
  peerIdAsync: Promise<string>;
  emitEvent: (e: MeshNetworkEvent<T>) => Promise<void>;
  members: string[];
  close: () => void;
}

export default class WordImpostorMesh {
  private readonly emitter = new EventEmitter<WordImpostorEvents>();
  private readonly lcm = new LifecycleManager();

  constructor(private readonly meshNetwork: MeshNetworkLike<MentalPokerEvent>, private readonly words: string[]) {
    this.propagate('status');
    this.propagate('connected');
    this.propagate('members');

    this.deck.promise.then(() => this.emitter.emit('shuffled'));

    this.meshNetwork.listener.on('event', this.lcm.register(({ data }) => {
      switch (data.type) {
        case 'start':
          this.handleRoundStartEvent(data);
          break;
        case 'deck/step1':
          this.handleDeckStep1Event(data);
          break;
        case 'deck/step2':
          this.handleDeckStep2Event(data);
          break;
        case 'deck/step3':
          this.handleDeckStep3Event(data);
          break;
        case 'deck/finalized':
          this.handleDeckFinalizedEvent(data);
          break;
        case 'card/decrypt':
          this.handleCardDecrypted(data);
          break;
      }
    }, listener => this.meshNetwork.listener.off('event', listener)));
  }

  async startGame(settings: MentalPokerSettings, impostors: number = 1) {
    await this.firePublicEvent({
      type: 'start',
      mentalPokerSettings: settings,
      impostors,
    });
  }

  async dealCard(round: number, playerOffset: number, recipient: string) {
    const deckOffset = round * this.words.length + playerOffset;
    const dealCardIfAliceOrBob = async (player: Player, aliceOrBob: 'alice' | 'bob') => {
      console.debug(`Sending decryption key of ${aliceOrBob} the card [${deckOffset}] to ${recipient}.`);
      const dk = player.getIndividualKey(deckOffset).decryptionKey;
      await this.firePrivateEvent({
        type: 'card/decrypt',
        deckOffset,
        aliceOrBob,
        decryptionKey: {
          d: dk.d.toString(),
          n: dk.n.toString(),
        },
      }, recipient);
    };

    const alice = await this.alice.promise;
    if (alice) {
      await dealCardIfAliceOrBob(alice, 'alice');
    }
    const bob = await this.bob.promise;
    if (bob) {
      await dealCardIfAliceOrBob(bob, 'bob');
    }
  }

  get listener(): EventListener<WordImpostorEvents> {
    return this.emitter;
  }

  close() {
    this.meshNetwork.close();
    this.lcm.close();
  }

  private propagate(eventName: (keyof (MeshNetworkEvents<MentalPokerEvent> | WordImpostorEvents))) {
    this.meshNetwork.listener.on(eventName, this.lcm.register((...args) => {
      this.emitter.emit(eventName, ...args);
    }, listener => this.meshNetwork.listener.off(eventName, listener)));
  }

  private async firePublicEvent(e: MentalPokerEvent) {
    await this.meshNetwork.emitEvent({
      type: 'public',
      sender: await this.meshNetwork.peerIdAsync,
      data: e,
    });
  }

  private async firePrivateEvent(e: MentalPokerEvent, recipient: string) {
    await this.meshNetwork.emitEvent({
      type: 'private',
      sender: await this.meshNetwork.peerIdAsync,
      recipient,
      data: e,
    });
  }

  private prepareDeck(members: number, impostors: number, words: number): WordImpostorEncodedDeck {
    const encodedCards: bigint[] = [];
    if (impostors <= 0 || impostors >= members) {
      throw new Error(`Impostors must be between 1 and ${members - 1}.`);
    }

    let impostorOffset: number = 0;
    for (let i = 0; i < words; i++) {
      for (let _ = 0; _ < (members - impostors); _++) {
        encodedCards.push(
          BigInt(i),
        );
      }
      for (let _ = 0; _ < impostors; _++) {
        encodedCards.push(
          BigInt(--impostorOffset),
        );
      }
    }
    return new WordImpostorEncodedDeck(encodedCards, impostors);
  }

  private mentalPokerSettings: Deferred<MentalPokerSettings> = new Deferred();
  private alice: Deferred<Player | null> = new Deferred();
  private bob: Deferred<Player | null> = new Deferred();
  private decryptionKeys: Deferred<{
    alice: Deferred<DecryptionKey>;
    bob: Deferred<DecryptionKey>;
  }[]> = new Deferred();

  private async handleRoundStartEvent(e: GameStartEvent) {
    const settings = e.mentalPokerSettings;
    this.mentalPokerSettings.resolve(settings);

    const myPeerId = await this.meshNetwork.peerIdAsync;

    const members = this.meshNetwork.members.length;
    const cards = this.words.length * members;

    const decryptionKeyPairDeckArray: {
      alice: Deferred<DecryptionKey>;
      bob: Deferred<DecryptionKey>;
    }[] = new Array(cards).fill(0).map(() => ({
      alice: new Deferred<DecryptionKey>(),
      bob: new Deferred<DecryptionKey>(),
    }));
    decryptionKeyPairDeckArray.forEach((decryptionKey, offset) => {
      Promise.all([
        decryptionKey.alice.promise,
        decryptionKey.bob.promise,
        this.deck.promise,
      ]).then(async ([alice, bob, deck]) => {
        const decryptedByAlice = alice.decrypt(deck.cards[offset]);
        const doubleDecrypted = bob.decrypt(decryptedByAlice);
        const wordOffset = Number(doubleDecrypted);
        if (wordOffset >= 0 && wordOffset < this.words.length) {
          this.emitter.emit('card', wordOffset);
        } else {
          this.emitter.emit('card', null); // impostor
        }
      });
    });
    this.decryptionKeys.resolve(decryptionKeyPairDeckArray);

    if (settings.alice === myPeerId) {
      console.debug('Creating Alice');

      const alicePromise = createPlayer({
        cards,
        bits: settings.bits ?? 32,
      });
      this.alice.resolve(alicePromise);

      const alice = await alicePromise;
      console.debug('Encrypting and shuffling the deck by Alice.');

      const deckEncoded = this.prepareDeck(members, e.impostors, this.words.length);
      const deckEncrypted = alice.encryptAndShuffle(deckEncoded);
      await this.firePublicEvent({
        type: 'deck/step1',
        deck: toStringEncodedDeck(deckEncrypted),
        publicKey: {
          p: alice.publicKey.p.toString(),
          q: alice.publicKey.q.toString(),
        }
      });
    } else {
      this.alice.resolve(null);
    }

    if (settings.bob !== myPeerId) {
      this.bob.resolve(null);
    }
  }

  private sharedPublicKey: Deferred<PublicKey> = new Deferred();

  private async handleDeckStep1Event(e: DeckStep1Event) {
    const settings = await this.mentalPokerSettings.promise;
    const myPeerId = await this.meshNetwork.peerIdAsync;

    if (settings.bob === myPeerId) {
      const sharedPublicKey = new PublicKey(BigInt(e.publicKey.p), BigInt(e.publicKey.q));
      this.sharedPublicKey.resolve(sharedPublicKey);

      console.debug('Creating Bob');
      const members = this.meshNetwork.members.length;
      const cards = this.words.length * members;
      const bobPromise = createPlayer({
        cards,
        publicKey: sharedPublicKey,
        bits: settings.bits ?? 32,
      });

      this.bob.resolve(bobPromise);

      const bob = await bobPromise;

      console.debug('Double-encrypting and shuffling the deck by Bob.');
      const encryptedWithKeyAKeyB = bob.encryptAndShuffle(toBigIntEncodedDeck(e.deck));

      await this.firePublicEvent({
        type: 'deck/step2',
        deck: toStringEncodedDeck(encryptedWithKeyAKeyB),
      });
    }
  }

  private async handleDeckStep2Event(e: DeckStep2Event) {
    const alice = await this.alice.promise;

    if (alice) {
      console.debug('Decrypting and encrypting individually by Alice.');
      const encryptedWithIndividualKeyAKeyB = alice.decryptAndEncryptIndividually(toBigIntEncodedDeck(e.deck));
      await this.firePublicEvent({
        type: 'deck/step3',
        deck: toStringEncodedDeck(encryptedWithIndividualKeyAKeyB),
      });
    }
  }

  private async handleDeckStep3Event(e: DeckStep3Event) {
    const bob = await this.bob.promise;

    if (bob) {
      console.debug('Decrypting and encrypting individually by Bob. (Deck shuffling is finalized)');
      const encryptedBothKeysIndividually = bob.decryptAndEncryptIndividually(toBigIntEncodedDeck(e.deck));
      await this.firePublicEvent({
        type: 'deck/finalized',
        deck: toStringEncodedDeck(encryptedBothKeysIndividually),
      });
    }
  }

  private deck: Deferred<EncodedDeck> = new Deferred();

  private async handleDeckFinalizedEvent(e: DeckFinalizedEvent) {
    this.deck.resolve(toBigIntEncodedDeck(e.deck));
  }

  private async handleCardDecrypted(e: DecryptCardEvent) {
    const dk = new DecryptionKey(BigInt(e.decryptionKey.d), BigInt(e.decryptionKey.n));
    const deckOffset = e.deckOffset;
    const decryptionKeys = await this.decryptionKeys.promise;
    switch (e.aliceOrBob) {
      case 'alice':
        decryptionKeys[deckOffset].alice.resolve(dk);
        break;
      case 'bob':
        decryptionKeys[deckOffset].bob.resolve(dk);
        break;
    }
  }
}
