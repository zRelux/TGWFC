import fs from 'fs';
import path from 'path';

import { Socket } from 'socket.io';
import shortId from 'shortid';

import rooms, { Room, Pack } from '../../db';

import shuffle from '../../utils/shuffle';

type CreatePayload = {
  username: string;
  number_of_rounds: number;
  packs: string[];
};

const createRoom = (payload: CreatePayload, socketId: string) => {
  //@ts-ignore
  const packs: Pack[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'db/packs.json')));

  const packsOfTheRoom = payload.packs.map(id => {
    return packs.filter(pack => id === pack.id)[0];
  });

  const cardsToFill = packsOfTheRoom.map(pack => pack.toFill);
  const cardsToGive = packsOfTheRoom.map(pack => pack.toUse);

  const roomToAdd: Room = {
    id: shortId(),
    cardsToFill: { index: 0, cards: shuffle(cardsToFill.flat(1)) },
    cardsToGive: { index: 0, cards: shuffle(cardsToGive.flat(1)) },
    chosenCards: [],
    roundsPlayed: 0,
    numberOfRounds: payload.number_of_rounds,
    users: [{ username: payload.username, id: socketId, points: 0, cards: [], host: true }]
  };

  rooms.push(roomToAdd);

  return roomToAdd;
};

export default (socket: Socket) => {
  socket.on('createRoom', (payload: CreatePayload) => {
    const { id } = createRoom(payload, socket.id);

    socket.join(id);

    socket.emit('createRoomReply', {
      room: {
        id,
        host: { username: payload.username, id: socket.id, points: 0, cards: [], host: true }
      }
    });
  });
};
