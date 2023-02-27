import {Body, Delete, Get, Controller, Param, Patch, Post, UseBefore, Req, Res} from "routing-controllers";
import {AppDataSource} from "../../db/data-source";
import {Category} from "../../entity/Category";
import {AdminAuthMiddelware} from "../../middleware/adminAuth";

@Controller()
export class CategoryController {

    constructor(private categoryRepository) {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    @Get('/categories')
    public async getAll() {
        try {
            const categories = await this.categoryRepository.find({ order: { id: "DESC" } });
            if (!categories) throw new Error('Categories not found');

            return categories;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/category/:id')
    public async getOne(@Param('id') id: number) {
        try {
            const category: Category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) throw new Error('Category not found');

            return category;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Post('/category')
    @UseBefore(AdminAuthMiddelware)
    public async post(@Body() data: Category) {
        try {
            const isExit: Category = await this.categoryRepository.findOne({ where: { title: data.getTitle() } });
            if (isExit) throw new Error('Category existing');

            const category: Category = data;
            if (!category) throw new Error('Category not created');

            await this.categoryRepository.save(category);
            return { success: "Category created" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Patch('/category/:id')
    @UseBefore(AdminAuthMiddelware)
    public async update(@Param('id') id: number, @Body() data: Category, @Req() req: any, @Res() res: any) {
        try {
            const category: Category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) return { error: 'Category not found' };

            await this.categoryRepository.save({...category, ...data});
            return { success: "Category updated" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Delete('/category/:id')
    @UseBefore(AdminAuthMiddelware)
    public async remove(@Param('id') id: number) {
        try {
            const category: Category = await this.categoryRepository.findOne({ where: { id } });
            console.log(category)
            if (!category) return { error: 'Category not found' };

            await this.categoryRepository.remove(category);
            return { success: "Category deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }
}