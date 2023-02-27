import { JsonController, Body, Post, UploadedFile, Get, Param, Req, UseBefore, Put, UploadedFiles } from 'routing-controllers';
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
    async CreateArticle(@Body() data: Article, @Body() fileData: File, @UploadedFiles("url", { options: multerConfig }) storedFile: Array<any>, @Req() req: any) {
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
            if(storedFile.length > 1){
                storedFile.forEach(element => {
                    this.fileRepository.save({...file, article: article, url: element.filename});
                });
            }

            /*Return response*/
            return { success: "Article created" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/article/:id')
    @UseBefore(UserAuthMiddelware)
    async getArticle(@Param('id') id: string) {
        try{
            const article: Article = await this.articleRepository.findOne({ where: {id: id} })
            if (!article) throw new Error('Article not found');
            const file: File = await this.fileRepository.find({
                relations: ["article"],
                where: { article: { id: article.getId()} }
            })
            if (!file) throw new Error('File not found');
            return { article : article, file }
        } catch(err){
            return { error: err.message }
        }
    }

    @Put('/article/:id')
    async updateArticle(@Body() data: Article, @Param('id') id: string) {
        try{
            const article: Article = await this.articleRepository.findOne({ where: {id: id} })
            if (!article) throw new Error('Article not found');
            const file: File = await this.fileRepository.find({
                relations: ["article"],
                where: { article: { id: article.getId()} }
            })
            if (!file) throw new Error('File not found');
            console.log(article, file);
            return { success : article, file }
        } catch(err){
            return { error: err.message }
        }
    }
}