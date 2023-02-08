import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Article } from '../entity/Article';

@JsonController()
export class ArticleController {

    constructor(public articleRepository) {
        this.articleRepository = AppDataSource.getRepository(Article);
    }

    @Get('/articles')
    async getAll() {
        try {
            const articles = await this.articleRepository.find({ order: { id: "DESC" } });
            if (!articles) throw new Error('Articles not found');
            return articles;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/articles/:id')
    async getOne(@Param('id') id: number) {
        try {
            const articles = await this.articleRepository.findOne({ where: { id } });
            if (!articles) throw new Error('Article not found');
            return articles;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Post('/articles')
    async post(@Body() data: Article) {
        try {
            const article: Article = data;
            if (!article) throw new Error('User not created');
            await this.articleRepository.save(article);
            return { success: "Article created" };
        } catch (err) {
            return { error: err.message }
        }
    }

}
