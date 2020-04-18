import shortId from 'shortid';

import packs, { Pack } from '../../db';

export type Payload = {
  packs: Pack[];
};

const rooms = [];

export const createRoom = (payload: Payload) => {
  const packsOfTheRoom = payload.packs.map(({ id }) => {
    return packs.filter(pack => id === pack.id)[0];
  });

  const roomToAdd = { id: shortId(), packs: packsOfTheRoom };

  rooms.push(roomToAdd);

  return roomToAdd;
};
