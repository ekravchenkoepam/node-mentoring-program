import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const timestamp = new Date().toUTCString();

        logger.info(`[${timestamp}] ${req.method} ${req.url} - ${duration}ms`);
    });
    next();
};