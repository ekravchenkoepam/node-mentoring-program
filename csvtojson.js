import fs from 'fs';
import csvtojson from 'csvtojson';

const csvFilePath = './csv/example.csv';
const txtOutputPath = './example.txt';

const convertCsvToJson = async () => {
  const csvStream = fs.createReadStream(csvFilePath);
  const txtStream = fs.createWriteStream(txtOutputPath);
  const csvConverter = csvtojson({
    headers: ['book', 'author', 'amount', 'price'],
    ignoreColumns: /amount/i,
    colParser: {
      price: 'number'
    }
  });

  csvStream.pipe(csvConverter).pipe(txtStream);

  csvConverter.on('done', (error) => {
    if (error) {
      console.error('Error converting CSV to JSON:', error.message);
    } else {
      console.log('CSV to JSON conversion completed successfully.');
    }
  });

  csvStream.on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
  });

  txtStream.on('error', (error) => {
    console.error('Error writing to TXT file:', error.message);
  });
};

convertCsvToJson();
