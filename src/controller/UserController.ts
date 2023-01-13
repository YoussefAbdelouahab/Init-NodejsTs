import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { User } from '../entity/User';

@JsonController()
export class UserController {
    public userRepository = AppDataSource.manager;

    @Get('/users')
    getAll() {
        return this.userRepository.find(User);
    }

    @Get('/users/:id')
    getOne(@Param('id') id: number) {
        return this.userRepository;
    }

    @Post('/users')
    post(@Body() user: User) {
        return this.userRepository.insert(User, user);
    }

    @Put('/users/:id')
    put(@Param('id') id: number, @Body() user: User) {
        return 'Updating a user...';
    }

    @Delete('/users/:id')
    remove(@Param('id') id: number) {
        return 'Removing user...';
    }

}