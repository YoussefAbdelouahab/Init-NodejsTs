import {ExpressMiddlewareInterface} from 'routing-controllers';
import {Request, Response} from "express";


export class AuthMiddelware implements ExpressMiddlewareInterface {

    use(req: Request, res: Response, next?: (err?: any) => any) {
        try {
            console.log("verif token")
        } catch (error) {
            return { error: error.message };
        }
    }
}