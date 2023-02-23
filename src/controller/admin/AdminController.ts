import {
    JsonController,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete, UseBefore, Req
} from 'routing-controllers';
import {AppDataSource} from '../../db/data-source';
import {Admin} from '../../entity/Admin';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AdminAuthMiddelware} from "../../middleware/adminAuth";

@JsonController()
export class AdminController {
    constructor(private adminRepository) {
        this.adminRepository = AppDataSource.getRepository(Admin);
    }

    @Post("/admin/register")
    public async register(@Body() data: Admin) {
        try {
            // verif object existing in data source
            //const hasAccount: Admin = await this.adminRepository.createQueryBuilder().where({ mail: data.getMail() }).andWhere({username: data.getUsername()});
            const hasAccount: Admin = await this.adminRepository.findOne({where: {mail: data.getMail()}});
            if (hasAccount) throw new Error('Account existing. Please Login');

            // hash password
            const hash = await bcrypt.hash(data.getPassword(), 10);

            // create object with condition
            const admin: Admin = data;
            if (!admin) throw new Error('Account not created');
            admin.setPassword(hash);

            await this.adminRepository.save(admin);

            return {success: "Account created"};
        } catch (error) {
            return {error: error.message};
        }
    }

    @Post("/admin/login")
    public async login(@Body() data: Admin, @Req() req: any) {
        try {
            // find object in data source
            const admin: Admin = await this.adminRepository.findOne({where: {mail: data.getMail()}});
            if (!admin) throw new Error('Account not found');

            // check if password conform
            const isValid = await bcrypt.compare(data.getPassword(), admin.getPassword());
            if (!isValid) throw new Error('Identifiant/password incorrect');

            req.session.token = jwt.sign({
                id: admin.getId(),
                roles: admin.getRoles(),
            }, "SECRET_TOKEN_KEY", {
                expiresIn: "24h"
            });

            if (!req.session.token) throw new Error('Error authentication');

            return {success: "Account login !"};

        } catch (error) {
            return {error: error.message};
        }
    }

    @Delete("/admin/logout")
    public async logout(@Req() req: any){
        try{
            if (!req.session.token) throw new Error('Unable to logout');

            req.session.destroy();

            return {success: "Logout with success"};
        }catch (error) {
            return {error: error.message};
        }
    }

    @Get('/admins')
    @UseBefore(AdminAuthMiddelware)
    async getAll() {
        try {
            const admins = await this.adminRepository.find({order: {id: "DESC"}});
            if (!admins) throw new Error('Admins not found');

            return admins;
        } catch (err) {
            return {error: err.message}
        }
    }

    @Get('/admin/:username')
    @UseBefore(AdminAuthMiddelware)
    async getOne(@Param('username') identifiant: string) {
        try {
            const admin = await this.adminRepository.findOne({where: {username: identifiant}});
            if (!admin) throw new Error('admin not found');

            return admin;
        } catch (err) {
            return {error: err.message}
        }
    }

    @Put('/admin/:id/:username')
    @UseBefore(AdminAuthMiddelware)
    async put(@Param('id') id: number, @Param('username') username: string, @Body() data: Admin) {
        try {
            const admin: Admin = await this.adminRepository.findOne({where: {id, username}});
            if (!admin) throw new Error('admin not found');

            await this.adminRepository.save({...admin, ...data});
            return {success: "admin updated"};
        } catch (err) {
            return {error: err.message}
        }
    }

    @Delete('/admin/:id/:username')
    @UseBefore(AdminAuthMiddelware)
    async remove(@Param('id') id: number, @Param('username') username: string) {
        try {
            const admin: Admin = await this.adminRepository.findOne({where: {id, username}});
            if (!admin) throw new Error('admin not found');

            await this.adminRepository.delete(admin);
            return {success: "admin deleted"};
        } catch (err) {
            return {error: err.message}
        }
    }

}