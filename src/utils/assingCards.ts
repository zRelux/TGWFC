import { Room } from '../db';

import addWithBounds from './addWithBounds';

export default (room: Room, many: number, userId: string) => {
  const cardsToAdd = [];

  for (let i = 0; i < many; i++) {
    room.cardsToGive.index = addWithBounds(room.cardsToGive.index, room.cardsToGive.cards.length);

    const card = room.cardsToGive.cards[room.cardsToGive.index];

    cardsToAdd.push({ userId, card });
  }

  return cardsToAdd;
};
