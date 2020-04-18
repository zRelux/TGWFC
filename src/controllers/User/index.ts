import shortId from 'shortid';

import packs from '../../db';

export type Payload = {
  numberOfRounds: number;
  packs: string[];
};

const rooms = [];

export const createRoom = (payload: Payload) => {
  const packsOfTheRoom = payload.packs.map(id => {
    return packs.filter(pack => id === pack.id)[0];
  });

  const roomToAdd = { id: shortId(), packs: packsOfTheRoom };

  rooms.push(roomToAdd);

  return roomToAdd;
};
