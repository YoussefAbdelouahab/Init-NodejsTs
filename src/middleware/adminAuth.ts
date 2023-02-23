import {ExpressMiddlewareInterface, Req, Res} from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import {Admin} from "../entity/Admin";
import {AppDataSource} from "../db/data-source";
import {NextFunction} from "express";

export class AdminAuthMiddelware implements ExpressMiddlewareInterface {

    constructor(private adminRepository) {
        this.adminRepository = AppDataSource.getRepository(Admin);
    }
    async use(@Req() req: any, @Res() res: any, next: NextFunction) {
        try{
            const token = req.session.token;
            if(!token) return res.sendStatus(401);

            // @ts-ignore
            const decodeToken = jwt.decode(token, "SECRET_TOKEN_KEY");

            const id = decodeToken.id;
            const roles = decodeToken.roles;

            if (!token) throw new Error('Unauthorized');

            const admin: Admin =  this.adminRepository.findOne({ where: { id: id } });
            if (!admin) throw new Error('Account not found !');

            if (roles != "ADMIN") throw new Error('Unauthorized');

            req.auth = { id };

        }catch (error){
            return {error: "Unauthorized"};
        }

        next();
    }
}