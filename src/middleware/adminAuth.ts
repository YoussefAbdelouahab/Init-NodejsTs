import {ExpressMiddlewareInterface, Req, Res} from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import {Admin} from "../entity/Admin";
import {AppDataSource} from "../db/data-source";

export class AdminAuthMiddelware implements ExpressMiddlewareInterface {

    constructor(private adminRepository) {
        this.adminRepository = AppDataSource.getRepository(Admin);
    }

    use(req: any, res: any, next?: (err?: any) => any): any{
        try{
            const token = req.session.token;
            if(!token) return res.sendStatus(401);

            // @ts-ignore
            const decodeToken = jwt.decode(token, "bc042227-9f88-414d");

            const id = decodeToken.id;
            const roles = decodeToken.roles;

            if (roles != "ADMIN") throw new Error('Unauthorized you need role admin');

            req.auth = { id };

        }catch (error){
            return {error: "Unauthorized"};
        }

        return next();
    }
}