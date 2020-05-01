import fs from 'fs';
import path from 'path';

import express from 'express';

import roomsdb, { Pack } from '../../db';
import shuffle from '../../utils/shuffle';

const router = express.Router();

router.get('/', (_, res) => {
  // @ts-ignore
  const packsFile = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'db/packs.json')));

  const itaPack = packsFile[0];

  const packs: Pack[] = shuffle(packsFile);

  const packsToSend = packs.map(pack => {
    return {
      id: pack.id,
      name: pack.name
    };
  });

  res.json({ packs: [itaPack, ...packsToSend] });
});

router.get('/rooms', (_, res) => {
  res.send({ rooms: roomsdb.rooms });
});

export default router;
