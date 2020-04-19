import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import addWithBounds from '../../utils/addWithBounds';
import assingCards from '../../utils/assingCards';

type WinnerPayload = {
  room_id: string;
  winner_card: string;
};

const winnerRound = (payload: WinnerPayload, socketId: string) => {
  const room = findRoom(payload.room_id);

  if (room) {
    room.roundsPlayed++;

    if (room.numberOfRounds === 0) {
      throw new Error('Game has finished');
    }

    room.numberOfRounds--;

    const winner = room.chosenCards.find(({ card }) => payload.winner_card === card);

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
          card_to_show: room.cardsToFill.cards[room.cardsToFill.index],
          cards: user.cards,
          i_am_chooser: iAmChooser,
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
