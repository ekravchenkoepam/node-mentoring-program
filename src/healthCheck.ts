import { MikroORM } from '@mikro-orm/core';
import { Request, Response } from 'express';

export const healthCheck = (orm: MikroORM) => {
    return async (req: Request, res: Response) => {
        try {
            await orm.em.getConnection().execute('SELECT 1');
            
            res.status(200).json({
                message: "Server is running and database is connected"
            });
        } catch (error) {
            console.error('Database connection failed:', error);
            res.status(500).json({
                message: "Server is running but database connection failed"
            });
        }
    };
};