export type Pack = {
  id: string;
  name: string;
  toFill: string[];
  toUse: string[];
};

export type RoomUser = {
  username: string;
  userId: string;
  points: number;
  cards: string[];
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
  chosenCards: { userId: string; card: string }[];
};

let rooms: Room[] = [];

export const updateRooms = (newRooms: Room[]) => {
  rooms = newRooms;
};

export default rooms;
