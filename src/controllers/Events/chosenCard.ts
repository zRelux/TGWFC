import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';

type ChosenCard = {
  roomId: string;
  chosenCard: string;
};

const chosenCard = (payload: ChosenCard, userId: string) => {
  const room = findRoom(payload.roomId);

  if (room) {
    if (room.chooser)
      if (room.chooser.user.userId === userId) {
        throw new Error('You are the chooser');
      }

    room.chosenCards.push({ userId, card: payload.chosenCard });

    room.users.forEach(user => {
      if (user.userId === userId) {
        user.cards = user.cards.filter(card => card !== payload.chosenCard);
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
        choosen_cards: room.chosenCards
      });
    } catch (error) {
      socket.emit('chosenCardReply', {
        error: error.message
      });
    }
  });
};
