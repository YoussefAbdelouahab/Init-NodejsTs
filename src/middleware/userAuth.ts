import {ExpressMiddlewareInterface, Req, Res} from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import {AppDataSource} from "../db/data-source";
import {User} from "../entity/User";
import {NextFunction} from "express";

export class UserAuthMiddelware implements ExpressMiddlewareInterface {

    constructor(public userRepository) {
        this.userRepository = AppDataSource.getRepository(User);
    }

    use(@Req() req: any, @Res() res: any, next: NextFunction) {
        try {
            const token = req.session.token;
            if(!token) return res.sendStatus(401);

            // @ts-ignore
            const decodeToken = jwt.decode(token, "SECRET_TOKEN_KEY");
            const id = decodeToken.id;

            if (!token) throw new Error('Unauthorized');

            const user: User =  this.userRepository.findOne({ where: { id: id } });
            if (!user) throw new Error('Account not found !');

            req.auth = { id };

        } catch (error) {
            return {error: "Unauthorized"};
        }

        next();
    }
}