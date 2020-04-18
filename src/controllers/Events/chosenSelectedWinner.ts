import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';

type WinnerPayload = {
  roomId: string;
  winnerCard: string;
};

const winnerRound = (payload: WinnerPayload) => {
  const room = findRoom(payload.roomId);

  if (room) {
    room.roundsPlayed++;
    room.numberOfRounds--;

    if (room.chooser) {
      const newIndex = room.chooser.index + 1 >= room.users.length ? 0 : room.chooser.index + 1;
      room.chooser = { index: newIndex, user: room.users[newIndex] };
    }

    const winner = room.chosenCards.find(({ card }) => payload.winnerCard === card);

    if (winner) {
      room.users.forEach(user => {
        if (user.userId === winner.userId) {
          user.points;
        }
      });

      room.users.forEach(user => {
        for (let i = 0; i < 1; i++) {
          let indexToUse = room.cardsToGive.index + 1;

          if (indexToUse >= room.cardsToGive.cards.length) {
            indexToUse = 0;
          }

          room.cardsToGive.index = indexToUse;
          const card = room.cardsToGive.cards[indexToUse];

          user.cards.push(card);
        }
      });
    }

    return room;
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('choseSelectedWinner', (payload: WinnerPayload) => {
    try {
      const room = winnerRound(payload);

      room.users.forEach(user => {
        let iAmChooser = false;

        if (room.chooser) {
          iAmChooser = user.userId === room.chooser.user.userId;
        }

        io.to(user.userId).emit('choseSelectedWinnerReply', {
          cardToShow: room.cardsToFill.cards[room.cardsToFill.index],
          cards: user.cards,
          iAmChooser,
          round: room.roundsPlayed
        });

        io.to(room.id).emit('choseSelectedWinnerReply', {
          room
        });

        let indexToUse = room.cardsToGive.index + 1;

        if (indexToUse >= room.cardsToGive.cards.length) {
          indexToUse = 0;
        }

        room.cardsToFill.index = indexToUse;
      });
    } catch (error) {
      socket.emit('choseSelectedWinnerReply', {
        error: error.message
      });
    }
  });
};
