import express from 'express';

import rooms, { packs } from '../../db';

const router = express.Router();

router.get('/', (_, res) => {
  const packsToSend = packs.map(pack => {
    return {
      id: pack.id,
      name: pack.name
    };
  });

  res.send({ packs: packsToSend });
});

router.get('/router', (_, res) => {
  res.send({ rooms });
});

export default router;
