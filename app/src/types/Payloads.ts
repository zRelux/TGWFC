import { User, Card } from './User';

export type LeavePayload = {
  user_left: User;
  new_host?: User;
};

export type RoomUpdatePayload = {
  room_host: User;
  lobby_users: User[];
  error?: string;
};

export type GameReplyPayload = {
  card_to_show: string;
  cards: Card[];
  i_am_chooser: boolean;
  round: number;
  chooser: User;
  error?: string;
  round_winner?: User;
  game_finished: boolean;
};
