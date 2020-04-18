import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import assingCards from '../../utils/assingCards';
import addWithBounds from '../../utils/addWithBounds';

type StartPayload = {
  roomId: string;
};

export const startGame = (payload: StartPayload) => {
  const room = findRoom(payload.roomId);

  if (room) {
    if (room.users.length < 2) {
      throw new Error('Too less players');
    }

    if (room.users.length === 10) {
      throw new Error('Too many players');
    }

    room.roundsPlayed++;
    room.numberOfRounds--;
    room.chooser = { index: 0, user: room.users[0] };

    room.users.forEach(user => {
      user.cards = assingCards(room, 6);
    });

    return room;
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('startGame', (payload: StartPayload) => {
    try {
      const room = startGame(payload);

      room.users.forEach(user => {
        let iAmChooser = false;

        if (room.chooser) {
          iAmChooser = user.userId === room.chooser.user.userId;
        }

        io.to(user.userId).emit('startGameReply', {
          cardToShow: room.cardsToFill.cards[room.cardsToFill.index],
          cards: user.cards,
          iAmChooser,
          round: room.roundsPlayed
        });

        room.cardsToFill.index = addWithBounds(room.cardsToFill.index, room.cardsToGive.cards.length);
      });
    } catch (error) {
      socket.emit('startGameReply', {
        error: error.message
      });
    }
  });
};
