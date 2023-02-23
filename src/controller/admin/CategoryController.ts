import {Body, Delete, Get, JsonController, Param, Post, Put, UseBefore} from "routing-controllers";
import {AppDataSource} from "../../db/data-source";
import {Category} from "../../entity/Category";
import {AdminAuthMiddelware} from "../../middleware/adminAuth";

@JsonController()
export class CategoryController {

    constructor(private categoryRepository) {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    @Get('/categories')
    async getAll() {
        try {
            const categories = await this.categoryRepository.find({ order: { id: "DESC" } });
            if (!categories) throw new Error('Categories not found');

            return categories;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/category/:id')
    async getOne(@Param('id') id: number) {
        try {
            const category: Category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) throw new Error('Category not found');

            return category;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Post('/admin/category')
    @UseBefore(AdminAuthMiddelware)
    async post(@Body() data: Category) {
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

    @Put('/admin/category/:id')
    @UseBefore(AdminAuthMiddelware)
    async put(@Param('id') id: number, @Body() data: Category) {
        try {
            const category: Category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) return { error: 'Category not found' };

            await this.categoryRepository.save({...category, ...data});
            return { success: "Category updated" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Delete('/admin/category/:id')
    @UseBefore(AdminAuthMiddelware)
    async remove(@Param('id') id: number) {
        try {
            const category: Category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) return { error: 'Category not found' };

            await this.categoryRepository.delete(category);
            return { success: "Category deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }
}