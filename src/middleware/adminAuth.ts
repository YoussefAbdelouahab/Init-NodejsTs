import {ExpressMiddlewareInterface, Req, Res} from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import {Admin} from "../entity/Admin";
import {AppDataSource} from "../db/data-source";

export class AdminAuthMiddelware implements ExpressMiddlewareInterface {

    constructor(private adminRepository) {
        this.adminRepository = AppDataSource.getRepository(Admin);
    }
    use(@Req() req: any, @Res() res: any, next?: (err?: any) => any) {
        try {
            const token = req.session.token;
            // @ts-ignore
            const decodeToken = jwt.decode(token, "SECRET_TOKEN_KEY");
            const id = decodeToken.id;
            const roles = decodeToken.roles;

            const admin: Admin =  this.adminRepository.findOne({ where: { id: id } });
            if (!admin) throw new Error('Admin not found !');

            if (roles != "ADMIN") throw new Error('Unauthorized');

            req.auth = { id, roles };
            next();

        } catch (error) {
            return {error: "Unauthorized"};
        }
    }
}