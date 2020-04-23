import fs from 'fs';
import path from 'path';

import express from 'express';

import roomsdb, { Pack } from '../../db';
import shuffle from '../../utils/shuffle';

const router = express.Router();

router.get('/', (_, res) => {
  const packsFile = fs.readFileSync(path.join(__dirname, '..', '..', 'db/packs.json'));
  // @ts-ignore
  const packs: Pack[] = shuffle(JSON.parse(packsFile));

  const packsToSend = packs.map(pack => {
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
