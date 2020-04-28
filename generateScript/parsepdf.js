/* eslint-disable */
const fs = require('fs');

const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('./original.pdf');

const readPdf = async () => {
  const data = await pdf(dataBuffer);

  const cards = data.text.split('.');

  for (const card of cards) {
    console.log(card);
    break;
  }
};

readPdf();
