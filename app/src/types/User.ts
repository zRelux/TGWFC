export type Card = {
  userId: string;
  card: string;
};

export type User = {
  id: string;
  username: string;
  points: number;
  cards: Card[];
  host: boolean;
};
