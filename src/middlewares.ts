import {Request, Response, NextFunction} from 'express';

const requestTimeLogger = (req: Request, res: Response, next: NextFunction) => {
    const date = Date.now();
    const formattedDate = new Date(date).toLocaleString('sve-SE');
    console.log('Incomming request at time:', formattedDate);
    next();
}

export default requestTimeLogger;