export type Pack = {
  id: string;
  name: string;
  toFill: string[];
  toUse: string[];
};

export type Card = { userId: string; card: string };

export type RoomUser = {
  id: string;
  username: string;
  points: number;
  cards: Card[];
  host: boolean;
};

export type Room = {
  id: string;
  users: RoomUser[];
  cardsToGive: { index: number; cards: string[] };
  cardsToFill: { index: number; cards: string[] };
  numberOfRounds: number;
  roundsPlayed: number;
  chooser?: { index: number; user: RoomUser };
  chosenCards: Card[];
};

let rooms: Room[] = [];

export default {
  get rooms() {
    return rooms;
  },
  set rooms(val) {
    rooms = val;
  }
};
