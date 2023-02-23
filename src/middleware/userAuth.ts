import {ExpressMiddlewareInterface, Req, Res} from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import {AppDataSource} from "../db/data-source";
import {User} from "../entity/User";

export class UserAuthMiddelware implements ExpressMiddlewareInterface {

    constructor(public userRepository) {
        this.userRepository = AppDataSource.getRepository(User);
    }

    use(@Req() req: any, @Res() res: any, next?: (err?: any) => any) {
        try {
            const token = req.session.token;
            // @ts-ignore
            const decodeToken = jwt.decode(token, "SECRET_TOKEN_KEY");
            const id = decodeToken.id;

            if (!token) throw new Error('Unauthorized');

            const user: User =  this.userRepository.findOne({ where: { id: id } });
            if (!user) throw new Error('Account not found !');

            req.auth = { id };
            next();

        } catch (error) {
            return {error: "Unauthorized"};
        }
    }
}