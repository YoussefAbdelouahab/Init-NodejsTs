import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { User } from '../entity/User';

@Controller()
export class UserController {
    public userRepository = AppDataSource.manager;

    @Get('/users')
    getAll() {
        return this.userRepository.find(User);
    }

    @Get('/users/:id')
    getOne(@Param('id') id: number) {
        return 'This action returns user #' + id;
    }

    @Post('/users')
    post(@Body() user: any) {
        return 'Saving user...';
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