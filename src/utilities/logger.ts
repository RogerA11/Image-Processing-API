import {Request, Response} from 'express';

// void ?? - research
// create custom middleware function named logger
const logger = (req: Request, res: Response, next: Function): void => {
    let url = req.url; // capture endpoint
    console.log(`${url} was visited`); // log endpoint onto terminal/console when endpoint is visited
    next();
}

export default logger;
