import {Request, Response, NextFunction} from 'express';

const REQUIRED_PASSWORD = 'Bearer password';

const requestTimeLogger = (req: Request, res: Response, next: NextFunction) => {
    const date = Date.now();
    const formattedDate = new Date(date).toLocaleString('sve-SE');
    console.log('Incomming request at time:', formattedDate);
    next();
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authValue = req.headers.authorization;

    if(authValue === REQUIRED_PASSWORD) {
        next();
    } else {
        res.sendStatus(401);
    }
}

export {requestTimeLogger, authenticate};