import fs from 'fs';
import path from 'path';

import express from 'express';

import roomsdb, { Pack } from '../../db';
import shuffle from '../../utils/shuffle';

const router = express.Router();

router.get('/', (_, res) => {
  // @ts-ignore
  const packsFile: Pack[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'db/packs.json')));

  const itaPack = packsFile.slice(0, 1)[0];

  const packs = shuffle(packsFile);

  const packsToSend = [itaPack, ...packs].map(pack => {
    return {
      id: pack.id,
      name: pack.name
    };
  });

  res.json({ packs: packsToSend });
});

router.get('/rooms', (_, res) => {
  res.send({ rooms: roomsdb.rooms });
});

export default router;
