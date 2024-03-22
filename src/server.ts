import http, { IncomingMessage, ServerResponse } from 'http';
import { PORT } from './config';
// import { parseRequestBody } from './parser';
import { router } from './api/users/user.router';

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    router(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});