import { IncomingMessage } from 'http';
import { Body } from './types';

export const parseRequestBody = (req: IncomingMessage): Promise<Body> => new Promise((resolve, reject) => {
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        resolve(JSON.parse(body));
    });

    req.on('error', (error: Error) => {
        reject(error);
    });
});