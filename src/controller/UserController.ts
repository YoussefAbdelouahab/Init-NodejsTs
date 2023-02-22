import {JsonController, Param, Body, Get, Post, Put, Delete, Req, UseBefore} from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { User } from '../entity/User';
import {Admin} from "../entity/Admin";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {AdminAuthMiddelware} from "../middleware/adminAuth";
import {UserAuthMiddelware} from "../middleware/userAuth";

@JsonController()
export class UserController {

    constructor(public userRepository) {
        this.userRepository = AppDataSource.getRepository(User);
    }

    @Post("/register")
    public async register(@Body() data: User) {
        try {
            // verif object existing in data source
            const hasAccount: Admin = await this.userRepository.findOne({where: {mail: data.getMail()}});
            if (hasAccount) throw new Error('Account existing');

            // hash password
            const hash = await bcrypt.hash(data.getPassword(), 10);

            // create object with condition
            const user: User = data;
            if (!user) throw new Error('Account not created');
            user.setPassword(hash);

            await this.userRepository.save(user);

            return {success: "Account created"};
        } catch (error) {
            return {error: error.message};
        }
    }

    @Post("/login")
    public async login(@Body() data: User, @Req() req: any) {
        try {
            // find object in data source
            const user: User = await this.userRepository.findOne({where: {mail: data.getMail()}});
            if (!user) throw new Error('Account not found');

            // check if password conform
            const isValid = await bcrypt.compare(data.getPassword(), user.getPassword());
            if (!isValid) throw new Error('Identifiant/password incorrect');

            req.session.token = jwt.sign({
                id: user.getId(),
                roles: user.getRoles(),
            }, "SECRET_TOKEN_KEY", {
                expiresIn: "24h"
            });

            if (!req.session.token) throw new Error('Error authentication');

            return {success: "Account login"};

        } catch (error) {
            return {error: error.message};
        }
    }

    @Get('/users')
    async getAll() {
        try {
            const users = await this.userRepository.find({ order: { id: "DESC" } });
            if (!users) throw new Error('Users not found');
            return users;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/users/:id')
    async getOne(@Param('id') id: number) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) throw new Error('User not found');
            return user;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Put('/users/:id/:username')
    @UseBefore(UserAuthMiddelware)
    async put(@Param('id') id: number, @Param('username') username: string, @Body() data: User) {
        try {
            const user: User = await this.userRepository.findOne({ where: {id, username} });
            if (!user) throw new Error('User not found');
            await this.userRepository.save({ ...user, ...data });
            return { success: "User updated" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Delete('/users/:id/:username')
    @UseBefore(UserAuthMiddelware)
    async remove(@Param('id') id: number, @Param('username') username: string) {
        try {
            const user: User = await this.userRepository.findOne({ where: {id, username} });
            if (!user) throw new Error('User not found');
            await this.userRepository.delete(user);
            return { success: "User deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }

}