import { pipeline } from 'stream/promises';
import fs from 'fs';
import csvtojson from 'csvtojson';

const csvFilePath = './csv/example.csv';
const txtOutputPath = './example.txt';

const convertCsvToJson = async () => {
  const readStream = fs.createReadStream(csvFilePath);
  const writeStream = fs.createWriteStream(txtOutputPath);
  const csvConverter = csvtojson({
    headers: ['book', 'author', 'amount', 'price'],
    ignoreColumns: /amount/i,
    colParser: {
      price: 'number'
    }
  });

  try {
    await pipeline(
      readStream,
      csvConverter,
      writeStream,
    );

    console.log('Pipeline succeeded');
  } catch (err) {
    console.error('Pipeline failed', err);
  }
};

convertCsvToJson();
