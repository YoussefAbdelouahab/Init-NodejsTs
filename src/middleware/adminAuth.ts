import {ExpressMiddlewareInterface, Req, Res} from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import {Admin} from "../entity/Admin";
import {AppDataSource} from "../db/data-source";
import {NextFunction} from "express";

export class AdminAuthMiddelware implements ExpressMiddlewareInterface {

    constructor(private adminRepository) {
        this.adminRepository = AppDataSource.getRepository(Admin);
    }
    public async use(@Req() req: any, @Res() res: any, next: NextFunction) {
        try{
            const token = req.session.token;
            if(!token) return res.sendStatus(401);

            // @ts-ignore
            const decodeToken = jwt.decode(token, "SECRET_TOKEN_KEY");

            const id = decodeToken.id;
            const roles = decodeToken.roles;

            if (roles != "ADMIN") throw new Error('Unauthorized you need role admin');

            req.auth = { id };

        }catch (error){
            return {error: "Unauthorized"};
        }

        next();
    }
}