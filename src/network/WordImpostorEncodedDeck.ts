import {EncodedDeck} from "mental-poker-toolkit/build/main/lib/mental-poker";
import generateRandomInt from "../util/generateRandomInt";

export default class WordImpostorEncodedDeck extends EncodedDeck {

  private impostors: number;

  constructor(cards: bigint[], impostors: number) {
    super(cards);
    this.impostors = impostors;
  }

  shuffle(seed?: number) {
    seed = seed ?? generateRandomInt();
    // pretend this.cards as a 2-D array, where each row has this.impostors of cards
    const twoDimArrayLength = this.cards.length / this.impostors;
    // 1. shuffle cards in each row
    for (let i = 0; i < twoDimArrayLength; ++i) {
      this.shuffleCardsBetween(i * this.impostors, this.impostors, seed % (i + 1));
    }
    // 2. shuffle rows
    for (let i = 0; i < twoDimArrayLength; ++i) {
      const j = i + (seed % (twoDimArrayLength - i));
      if (i !== j) {
        // swap two rows
        for (let k = 0; k < this.impostors; ++k) {
          const tmp = this.cards[i * this.impostors + k];
          this.cards[i * this.impostors + k] = this.cards[j * this.impostors + k];
          this.cards[j * this.impostors + k] = tmp;
        }
      }
    }
  }

  private shuffleCardsBetween(start: number, size: number, seed: number) {
    for (let i = 0; i < size - 1; ++i) {
      const j = i + (seed % (size - i));
      if (i !== j) {
        const tmp = this.cards[i + start];
        this.cards[i + start] = this.cards[j + start];
        this.cards[j + start] = tmp;
      }
    }
  }
}
