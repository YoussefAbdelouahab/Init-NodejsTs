import {
    JsonController,
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete, Session, UseBefore, Req, Res
} from 'routing-controllers';
import { AppDataSource } from '../../db/data-source';
import { Admin } from '../../entity/Admin';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {SessionParam} from "routing-controllers/decorator/SessionParam";
import {AuthMiddelware} from "../../middleware/auth";
import {Request, Response} from "express";

@Controller()
export class AdminController {
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
    public async login(@Session() session: any, @Body() data: Admin, @Res() res: Response) {
        try {
            // find object in data source
            const admin: Admin = await this.adminRepository.findOne({ where: { mail: data.getMail() } });
            if (!admin) throw new Error('Admin not found !');

            // verif object with password conform
            const isValid = await bcrypt.compare(data.getPassword(), admin.getPassword());
            if (!isValid) throw new Error('Identifiant/password incorrect');

            // stock in session token

            // return res.json({
            //     status: res.statusCode,
            //     token: jwt.sign({
            //         adminId: admin.getId(),
            //         adminRoles: admin.getRoles(),
            //     }, "SECRET_TOKEN_KEY", {
            //         expiresIn: "24h"
            //     })
            // });

            return res.send("hello");

        } catch (error) {
            return { error: error.message };
        }
    }

    @Get("/test")
    savePost(@Req() req: any) {
        return req.headers;
    }

    @Get('/admins')
    async getAll() {
        try {
            const admins = await this.adminRepository.find({ order: { id: "DESC" } });
            if (!admins) throw new Error('Admins not found');

            return admins;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/admin/:username')
    async getOne(@Param('username') identifiant: string) {
        try {
            const admin = await this.adminRepository.findOne({ where: { username: identifiant } });
            if (!admin) throw new Error('admin not found');

            return admin;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Put('/admin/:id/:username')
    async put(@Param('id') id: number, @Param('username') username: string, @Body() data: Admin) {
        try {
            const admin: Admin = await this.adminRepository.findOne({ where: { id, username } });
            if (!admin) throw new Error('admin not found');

            await this.adminRepository.save({ ...admin, ...data });
            return { success: "admin updated" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Delete('/admin/:id/:username')
    async remove(@Param('id') id: number, @Param('username') username: string) {
        try {
            const admin: Admin = await this.adminRepository.findOne({ where: { id, username } });
            if (!admin) throw new Error('admin not found');

            await this.adminRepository.delete(admin);
            return { success: "admin deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }

}