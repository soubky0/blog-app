import { Request, Response, NextFunction } from 'express';
import {logger} from "../index";
export class HttpError extends Error {
    status?: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}


export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    logger.error(`Error on ${req.url} with status ${status} with message "${message}"`);
    res.status(status).json({ error: message });
};
