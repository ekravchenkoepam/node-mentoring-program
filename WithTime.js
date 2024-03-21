import { EventEmitter } from './EventEmitter.js';
import https from 'https';

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
      this.emit('begin');
      console.time('execute');
      asyncFunc(...args, (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.timeEnd('execute');
          this.emit('end');
          this.emit('data', data);
      });
  }
}

const fetchFromUrl = (url, cb) => {
  https.get(url, res => {
      let rawData = '';

      res.setEncoding('utf8');
      res.on('data', chunk => { rawData += chunk; });
      res.on('end', () => {
          try {
            const jsonData = JSON.parse(rawData);
            cb(null, jsonData);
        } catch (e) {
            cb(e);
          }
      });
  }).on('error', e => {
    cb(e);
  });
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data) => console.log('Data:', data));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners('end'));