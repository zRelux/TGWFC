import { Socket } from 'socket.io';
import shortId from 'shortid';

import rooms, { packs, Room } from '../../db';
import shuffle from '../../utils/shuffle';

type CreatePayload = {
  username: string;
  number_of_rounds: number;
  packs: string[];
};

const createRoom = (payload: CreatePayload, socketId: string) => {
  const packsOfTheRoom = payload.packs.map(id => {
    return packs.filter(pack => id === pack.id)[0];
  });

  const cardsToFill = packsOfTheRoom.map(pack => pack.toFill);
  const cardsToGive = packsOfTheRoom.map(pack => pack.toUse);

  const roomToAdd: Room = {
    id: '1', //shortId(),
    cardsToFill: { index: 0, cards: shuffle(cardsToFill.flat(1)) },
    cardsToGive: { index: 0, cards: shuffle(cardsToGive.flat(1)) },
    chosenCards: [],
    roundsPlayed: 0,
    numberOfRounds: payload.number_of_rounds,
    users: [{ username: payload.username, userId: socketId, points: 0, cards: [], host: true }]
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
        id
      }
    });
  });
};
