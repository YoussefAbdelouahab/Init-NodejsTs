import {
    JsonController,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    UseBefore, Session
} from 'routing-controllers';
import { AppDataSource } from '../../db/data-source';
import { Admin } from '../../entity/Admin';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthMiddelware} from "../../middleware/auth";

@JsonController()
export class AdminController {
    private token;
    constructor(private adminRepository) {
        this.adminRepository = AppDataSource.getRepository(Admin);
    }
    @Post("/admin/register")
    public async register(@Body() data: Admin) {
        try {
            // verif object existing in data source
            const hasAccount: Admin = await this.adminRepository.findOne({ where: { mail: data.getMail() } });
            if (hasAccount) throw new Error('Account existing !');

            // hash password
            const hash = await bcrypt.hash(data.getPassword(), 10);

            // create object with condition
            const admin: Admin = data;
            if (!admin) throw new Error('Admin not created');
            admin.setPassword(hash);

            await this.adminRepository.save(admin);

            return { success: "Admin created" };
        } catch (error) {
            return { error: error.message };
        }
    }
    @Post("/admin/login")
    public async login(@Body() data: Admin, @Session() session: any) {
        try {
            // find object in data source
            const admin: Admin = await this.adminRepository.findOne({ where: { mail: data.getMail() } });
            if (!admin) throw new Error('Admin not found !');

            // verif object with password conform
            const isValid = await bcrypt.compare(data.getPassword(), admin.getPassword());
            if (!isValid) throw new Error('Identifiant/password incorrect');

            // stock in session token
            session = jwt.sign({
                adminId: admin.getId(),
                adminRoles: admin.getRoles(),
            }, "SECRET_TOKEN_KEY", {
                expiresIn: "24h"
            });

            return session;

        } catch (error) {
            return { error: error.message };
        }
    }

    @Get('/admin/test')
    @UseBefore(AuthMiddelware)
    async getConnection() {

        return "get connection";
    }

    // @Get('/admins/:id')
    // async getOne(@Param('id') id: number) {
    //     try {
    //         const admin = await this.adminRepository.findOne({ where: { id } });
    //         if (!admin) throw new Error('admin not found');
    //         return admin;
    //     } catch (err) {
    //         return { error: err.message }
    //     }
    // }


    // @Put('/admins/:id')
    // async put(@Param('id') id: number, @Body() data: Admin) {
    //     try {
    //         const admin: Admin = await this.adminRepository.findOne({ where: { id } });
    //         if (!admin) throw new Error('admin not found');
    //         await this.adminRepository.save({ ...admin, ...data });
    //         return { success: "admin updated" };
    //     } catch (err) {
    //         return { error: err.message }
    //     }
    // }

    // @Delete('/admins/:id')
    // async remove(@Param('id') id: number) {
    //     try {
    //         const admin: Admin = await this.adminRepository.findOne({ where: { id } });
    //         if (!admin) throw new Error('admin not found');
    //         await this.adminRepository.delete(admin);
    //         return { success: "admin deleted" };
    //     } catch (err) {
    //         return { error: err.message }
    //     }
    // }

}