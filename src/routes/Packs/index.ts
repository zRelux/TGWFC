import fs from 'fs';
import path from 'path';

import express from 'express';

import rooms, { Pack } from '../../db';

const router = express.Router();

router.get('/', (_, res) => {
  const packsFile = JSON.stringify(fs.readFileSync(path.join(__dirname, '..', '..', 'db/packs.json')));
  const packs: Pack[] = JSON.parse(packsFile);

  const packsToSend = packs.map(pack => {
    return {
      id: pack.id,
      name: pack.name
    };
  });

  res.send({ packs: packsToSend });
});

router.get('/rooms', (_, res) => {
  res.send({ rooms });
});

export default router;
