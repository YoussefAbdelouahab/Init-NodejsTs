import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { User } from '../entity/User';

@JsonController()
export class UserController {

    constructor(public userRepository) {
        this.userRepository = AppDataSource.getRepository(User);
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


    @Post('/users')
    async post(@Body() data: User) {
        try {
            const user: User = data;
            if (!user) throw new Error('User not created');
            await this.userRepository.save(user);
            return { success: "User created" };
        } catch (err) {
            return { error: err.message }
        }

    }

    @Put('/users/:id')
    async put(@Param('id') id: number, @Body() data: User) {
        try {
            const user: User = await this.userRepository.findOne({ where: { id } });
            if (!user) throw new Error('User not found');
            await this.userRepository.save({ ...user, ...data });
            return { success: "User updated" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Delete('/users/:id')
    async remove(@Param('id') id: number) {
        try {
            const user: User = await this.userRepository.findOne({ where: { id } });
            if (!user) throw new Error('User not found');
            await this.userRepository.delete(user);
            return { success: "User deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }

}