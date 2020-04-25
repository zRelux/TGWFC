import socketIO, { Socket } from 'socket.io';

import * as yup from 'yup';

import { RoomUser, Room, Card } from '../../db';

import findRoom from '../../utils/findRoom';
import addWithBounds from '../../utils/addWithBounds';
import assingCards from '../../utils/assingCards';

type WinnerPayload = {
  room_id: string;
  winner_card: Card;
};

const winnerRound = (payload: WinnerPayload, socketId: string): [Room, RoomUser | undefined, boolean | undefined] => {
  const room = findRoom(payload.room_id);

  if (room) {
    const gameFinished = room.numberOfRounds === 0;
    room.roundsPlayed++;

    room.numberOfRounds--;

    const winner = room.chosenCards.find(({ userId }) => payload.winner_card.userId === userId);

    room.chosenCards = [];

    if (winner) {
      const winnerUser = room.users.filter(user => {
        return user.id === winner.userId;
      })[0];

      room.users.forEach(user => {
        if (user.id === winner.userId) {
          user.points++;
        }
      });

      room.users.forEach(user => {
        if (user.id !== socketId) {
          user.cards = user.cards.concat(assingCards(room, 1, user.id));
        }
      });

      if (room.chooser) {
        if (room.chooser.user.id !== socketId) {
          throw new Error('You are not the chooser');
        }

        const newIndex = addWithBounds(room.chooser.index, room.users.length);
        room.chooser = { index: newIndex, user: room.users[newIndex] };
      }

      return [room, winnerUser, gameFinished];
    }

    return [room, undefined, false];
  } else {
    throw new Error('Room not found');
  }
};

const schema = yup.object().shape({
  room_id: yup.string(),
  winner_card: yup.object({
    userId: yup.string(),
    card: yup.string()
  })
});

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('chosenSelectedWinner', async (payload: WinnerPayload) => {
    try {
      await schema.validate(payload);

      const [room, winner, gameFinished] = winnerRound(payload, socket.id);

      room.users.forEach(user => {
        let iAmChooser = false;

        if (room.chooser) {
          iAmChooser = user.id === room.chooser.user.id;
        }

        io.to(user.id).emit('chosenSelectedWinnerReply', {
          card_to_show: room.cardsToFill.cards[room.cardsToFill.index],
          cards: user.cards,
          i_am_chooser: iAmChooser,
          chooser: room.chooser && room.chooser.user,
          round: room.roundsPlayed,
          round_winner: winner,
          game_finished: gameFinished
        });
      });

      const index = room.users.findIndex(user => user.host === true);
      const user = room.users[index];

      io.to(room.id).emit('updatedRoomReply', {
        room_host: user,
        lobby_users: room.users
      });

      room.cardsToFill.index = addWithBounds(room.cardsToFill.index, room.cardsToGive.cards.length);
    } catch (error) {
      console.error(error);

      socket.emit('chosenSelectedWinnerReply', {
        error: error.message
      });
    }
  });
};
