import { Server } from 'http';
import { Socket } from 'net';

let connections: Socket[] = [];

export const gracefulShutdown = (server: Server) => {
    server.on('connection', (connection: Socket) => {
        connections.push(connection);

        connection.on('close', () => {
            connections = connections.filter((currentConnection) => currentConnection !== connection);
        });
    });

    const shutdown = () => {
        console.log('Received kill signal, shutting down gracefully');

        server.close(() => {
            console.log('Closed out remaining connections');
            process.exit(0);
        });

        setTimeout(() => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 20000);

        connections.forEach((connection) => connection.end());

        setTimeout(() => {
            connections.forEach((connection) => connection.destroy());
        }, 10000);
    }

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}