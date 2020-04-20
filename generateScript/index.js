/* eslint-disable */
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const apiUrl = 'https://cah.greencoaststudios.com/api/v1/';

const delay = ms => new Promise(res => setTimeout(res, ms));

const fetchAndSave = async () => {
  let finalPacks = [];

  await delay(5000);
  const { data } = await axios.get(apiUrl);
  const packsToLoop = data.types;

  for (const packs of packsToLoop) {
    const sets = packs.packs;

    for (const set of sets) {
      await delay(5000);
      try {
        console.log(apiUrl + packs.id + '/' + set);

        const res = await axios.get(apiUrl + packs.id + '/' + set);
        const packData = res.data;

        const toFillCards = packData.black
          .filter(blackCard => blackCard.pick === 1)
          .map(cardToUse => cardToUse.content);

        finalPacks.push({
          id: set,
          name: packData.pack.name,
          toFill: toFillCards,
          toUse: packData.white
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  console.log(finalPacks);

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'db', 'packs.json'), JSON.stringify(finalPacks));
};

fetchAndSave();
