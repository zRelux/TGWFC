require('dotenv').config();

import express from 'express';

import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { Socket } from 'socket.io';

import { createRoom } from './controllers/User';

const app = express();

const server = require('http').Server(app);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(compression());
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

io.on('connection', (socket: Socket) => {
  socket.on('createRoom', (payload: any) => {
    const room = createRoom(payload);

    console.log(room);
  });
});

const appInit = async () => {
  console.log(`Example app listening on port ${port}!`);
};

server.listen(port, appInit);
