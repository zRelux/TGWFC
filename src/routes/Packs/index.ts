import express from 'express';

import packs from '../../db';

const router = express.Router();

router.get('/', (_, res) => {
  const packsToSend = packs.map(pack => {
    return {
      id: pack.id,
      name: pack.name
    };
  });

  res.send(packsToSend);
});

export default router;
