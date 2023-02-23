import { JsonController, Body, Post, UploadedFile, Get, Param, Req, UseBefore } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Article } from '../entity/Article';
import { File } from '../entity/File';
import { multerConfig } from '../config/multer';
import { User } from '../entity/User';
import { UserAuthMiddelware } from '../middleware/userAuth';
@JsonController()
export class ArticleController {
    constructor(public articleRepository, public fileRepository, public userRepository) {
        this.articleRepository = AppDataSource.getRepository(Article);
        this.fileRepository = AppDataSource.getRepository(File);
        this.userRepository = AppDataSource.getRepository(User);
    }

    @Post('/article')
    @UseBefore(UserAuthMiddelware)
    async CreateArticle(@Body() data: Article, @Body() fileData: File, @UploadedFile("url", { options: multerConfig }) storedFile: any, @Req() req: any) {
        try {
            /*Initialising objects and variables*/
            const article: Article = data;
            const user: User = await this.userRepository.findOne({ where: {id :req.auth.id} });
            const file: File = fileData;
            article.setStatus(0)
            article.setUser(user);
            
            /*Check if file gived */
            if (!storedFile) throw new Error('File required');

            /*Saving datas*/
            await this.articleRepository.save(article);
            await this.fileRepository.save({...file, article: article, url: storedFile.filename});

            /*Return response*/
            return { success: "Article created" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/article/:id')
    getArticle(@Param('id') id: string) {
        const article: Article = this.articleRepository.findOne(id).then(function (result) {
            console.log(result);
        });
    }
}