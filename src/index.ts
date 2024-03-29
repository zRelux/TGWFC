require('dotenv').config();

import http from 'http';

import express from 'express';

import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import socketIO, { Socket } from 'socket.io';

import {
  createRoom,
  joinRoom,
  startGame,
  chosenCard,
  chosenSelectedWinner,
  finishGame,
  disconnect,
  leaveRoom,
  kickUser,
  updateUserRef
} from './controllers/Events';

import packsHandler from './routes/Packs';

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(compression());
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/packs', packsHandler);

io.on('connection', (socket: Socket) => {
  createRoom(socket);
  joinRoom(socket, io);
  leaveRoom(socket, io);
  kickUser(socket, io);
  startGame(socket, io);
  chosenCard(socket, io);
  chosenSelectedWinner(socket, io);
  finishGame(socket, io);

  updateUserRef(socket, io);

  disconnect(socket, io);
});

const appInit = async () => {
  console.log(`App listening on port ${port}!`);
};

server.listen(port, appInit);
