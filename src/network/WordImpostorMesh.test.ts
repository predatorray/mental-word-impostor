import {MeshNetworkEvent, MeshNetworkEvents} from "./MeshNetwork";
import WordImpostorMesh, {MentalPokerEvent, MeshNetworkLike} from "./WordImpostorMesh";
import EventEmitter from "eventemitter3";
import Deferred from "../util/Deferred";

class MockMeshNetwork implements MeshNetworkLike<MentalPokerEvent> {
  listener = new EventEmitter<MeshNetworkEvents<MeshNetworkEvent<MentalPokerEvent>>>();
  peerIdAsync: Promise<string>;
  peerIdDeferred = new Deferred<string>();
  members: string[] = [];

  eventsEmitted: Array<MeshNetworkEvent<MentalPokerEvent>> = [];

  private paired?: MockMeshNetwork;

  constructor() {
    this.peerIdAsync = this.peerIdDeferred.promise;
  }

  async emitEvent(e: MeshNetworkEvent<MentalPokerEvent>) {
    const myPeerId = await this.peerIdAsync;
    this.eventsEmitted.push(e);
    this.listener.emit('event', e, myPeerId);
    if (this.paired) {
      if (e.type === 'public' || e.recipient === await this.paired.peerIdAsync) {
        this.paired.listener.emit('event', e, myPeerId);
      }
    }
  }

  get lastEventEmitted() {
    return this.eventsEmitted[this.eventsEmitted.length - 1];
  }

  pair(another: MockMeshNetwork) {
    this.paired = another;
    another.paired = this;
  }

  close(): void {
  }
}

const words = ['hello', 'world', 'foo', 'bar'];

describe('WordImpostorMesh', () => {
  it('should shuffle if started', async () => {
    const mockMeshNetwork = new MockMeshNetwork();
    const wordImpostorMesh = new WordImpostorMesh(mockMeshNetwork, words);

    mockMeshNetwork.peerIdDeferred.resolve('myid');
    mockMeshNetwork.members = ['myid', 'dummy']

    await wordImpostorMesh.startGame({
      alice: 'myid',
      bob: 'myid',
    });

    expect(mockMeshNetwork.lastEventEmitted).toMatchObject({
      type: 'public',
      sender: 'myid',
      data: {
        type: 'start',
        mentalPokerSettings: {
          alice: 'myid',
          bob: 'myid',
        },
        impostors: 1,
      },
    });

    await new Promise(resolve => {
      wordImpostorMesh.listener.on('shuffled', () => resolve(undefined));
    });
  }, 30000);

  it('should reveal the word offset if dealt', async () => {
    const mockMeshNetwork = new MockMeshNetwork();
    const wordImpostorMesh = new WordImpostorMesh(mockMeshNetwork, words);

    mockMeshNetwork.peerIdDeferred.resolve('myid');
    mockMeshNetwork.members = ['myid', 'dummy']

    await wordImpostorMesh.startGame({
      alice: 'myid',
      bob: 'myid',
    });

    await new Promise(resolve => {
      wordImpostorMesh.listener.on('shuffled', () => resolve(undefined));
    });

    const wordOffsetReceivedPromise = new Promise<number | null>(resolve => {
      wordImpostorMesh.listener.on('card', (wordOffset) => resolve(wordOffset));
    });
    await wordImpostorMesh.dealCard(0, 0, 'myid');
    const wordOffsetReceived: number | null = await wordOffsetReceivedPromise;

    expect(wordOffsetReceived === null || (wordOffsetReceived >= 0 && wordOffsetReceived < words.length))
      .toBe(true);
  }, 30000);
});
