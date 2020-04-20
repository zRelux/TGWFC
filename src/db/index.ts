export type Pack = {
  id: string;
  name: string;
  toFill: string[];
  toUse: string[];
};

export const packs: Pack[] = [
  {
    id: '1',
    name: 'Jews Pack',
    toFill: [
      'Card to give 1',
      'Card to give 2',
      'Card to give 3',
      'Card to give 4',
      'Card to give 5',
      'Card to give 6',
      'Card to give 7',
      'Card to give 8',
      'Card to give 9',
      'Card to give 10'
    ],
    toUse: [
      'Card to use 1',
      'Card to use 2',
      'Card to use 3',
      'Card to use 4',
      'Card to use 5',
      'Card to use 6',
      'Card to use 7',
      'Card to use 8',
      'Card to use 9',
      'Card to use 10'
    ]
  },
  {
    id: '2',
    name: 'Base US Pack',
    toFill: [
      'Card to give 1',
      'Card to give 2',
      'Card to give 3',
      'Card to give 4',
      'Card to give 5',
      'Card to give 6',
      'Card to give 7',
      'Card to give 8',
      'Card to give 9',
      'Card to give 10'
    ],
    toUse: [
      'Card to use 1',
      'Card to use 2',
      'Card to use 3',
      'Card to use 4',
      'Card to use 5',
      'Card to use 6',
      'Card to use 7',
      'Card to use 8',
      'Card to use 9',
      'Card to use 10'
    ]
  },
  {
    id: '3',
    name: '90s Nostalgia Pack',
    toFill: [
      'Card to give 1',
      'Card to give 2',
      'Card to give 3',
      'Card to give 4',
      'Card to give 5',
      'Card to give 6',
      'Card to give 7',
      'Card to give 8',
      'Card to give 9',
      'Card to give 10'
    ],
    toUse: [
      'Card to use 1',
      'Card to use 2',
      'Card to use 3',
      'Card to use 4',
      'Card to use 5',
      'Card to use 6',
      'Card to use 7',
      'Card to use 8',
      'Card to use 9',
      'Card to use 10'
    ]
  },
  {
    id: '4',
    name: 'Meme Pack',
    toFill: [
      'Card to give 1',
      'Card to give 2',
      'Card to give 3',
      'Card to give 4',
      'Card to give 5',
      'Card to give 6',
      'Card to give 7',
      'Card to give 8',
      'Card to give 9',
      'Card to give 10'
    ],
    toUse: [
      'Card to use 1',
      'Card to use 2',
      'Card to use 3',
      'Card to use 4',
      'Card to use 5',
      'Card to use 6',
      'Card to use 7',
      'Card to use 8',
      'Card to use 9',
      'Card to use 10'
    ]
  }
];

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
