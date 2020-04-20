import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';

type ChosenCard = {
  room_id: string;
  chosen_card: string;
};

const chosenCard = (payload: ChosenCard, userId: string) => {
  const room = findRoom(payload.room_id);

  if (room) {
    if (room.chooser)
      if (room.chooser.user.userId === userId) {
        throw new Error('You are the chooser');
      }

    room.chosenCards.push({ userId, card: payload.chosen_card });

    room.users.forEach(user => {
      if (user.userId === userId) {
        user.cards = user.cards.filter(card => card !== payload.chosen_card);
      }
    });

    return room;
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('chosenCard', (payload: ChosenCard) => {
    try {
      const room = chosenCard(payload, socket.id);

      io.to(room.id).emit('chosenCardReply', {
        chosen_cards: room.chosenCards.map(({ card }) => card)
      });
    } catch (error) {
      socket.emit('chosenCardReply', {
        error: error.message
      });
    }
  });
};
