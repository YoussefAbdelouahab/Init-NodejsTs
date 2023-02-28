import {ExpressMiddlewareInterface, Req, Res} from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import {AppDataSource} from "../db/data-source";
import {User} from "../entity/User";


export class AuthMiddelware implements ExpressMiddlewareInterface {

    constructor(public userRepository) {
        this.userRepository = AppDataSource.getRepository(User);
    }

    use(req: any, res: any, next?: (err?: any) => any): any {
        try {
            const token = req.session.token;
            if(!token) return res.sendStatus(401);

            // @ts-ignore
            const decodeToken = jwt.decode(token, "bc042227-9f88-414d");
            const id = decodeToken.id;

            req.auth = { id };

        } catch (error) {
            return {error: "Unauthorized"};
        }

        return next();
    }
}