import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import addWithBounds from '../../utils/addWithBounds';
import assingCards from '../../utils/assingCards';

type WinnerPayload = {
  roomId: string;
  winnerCard: string;
};

const winnerRound = (payload: WinnerPayload, socketId: string) => {
  const room = findRoom(payload.roomId);

  if (room) {
    room.roundsPlayed++;

    if (room.numberOfRounds === 0) {
      throw new Error('Game has finished');
    }

    room.numberOfRounds--;

    const winner = room.chosenCards.find(({ card }) => payload.winnerCard === card);

    if (winner) {
      room.users.forEach(user => {
        if (user.userId === winner.userId) {
          user.points++;
        }
      });

      room.users.forEach(user => {
        user.cards = assingCards(room, 1);
      });
    }

    if (room.chooser) {
      if (room.chooser.user.userId !== socketId) {
        throw new Error('You are not the chooser');
      }

      const newIndex = addWithBounds(room.chooser.index, room.users.length);
      room.chooser = { index: newIndex, user: room.users[newIndex] };
    }

    return room;
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('chosenSelectedWinner', (payload: WinnerPayload) => {
    try {
      const room = winnerRound(payload, socket.id);

      room.users.forEach(user => {
        let iAmChooser = false;

        if (room.chooser) {
          iAmChooser = user.userId === room.chooser.user.userId;
        }

        io.to(user.userId).emit('chosenSelectedWinnerReply', {
          cardToShow: room.cardsToFill.cards[room.cardsToFill.index],
          cards: user.cards,
          iAmChooser,
          round: room.roundsPlayed
        });

        room.cardsToFill.index = addWithBounds(room.cardsToFill.index, room.cardsToGive.cards.length);
      });
    } catch (error) {
      socket.emit('chosenSelectedWinnerReply', {
        error: error.message
      });
    }
  });
};
