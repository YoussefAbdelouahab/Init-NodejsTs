import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { User } from '../entity/User';

@JsonController()
export class UserController {
    public userRepository = AppDataSource.getRepository(User);

    @Get('/users')
    getAll() {
        return this.userRepository.find();
    }

    @Get('/users/:id')
    getOne(@Param('id') id: number) {
        return this.userRepository.findOneBy({ id: id });
    }


    @Post('/users')
    post(@Body() user: User): void {
        this.userRepository.insert(user);

    }

    @Put('/users/:id')
    async put(@Param('id') id: number, @Body() u: User) {
        const user: User = await this.userRepository.findOneBy({ id: id });
        await this.userRepository.save({ ...user, ...u });
    }

    @Delete('/users/:id')
    async remove(@Param('id') id: number) {
        const user: User = await this.userRepository.findOneBy({ id: id });
        await this.userRepository.remove(user);
    }

}