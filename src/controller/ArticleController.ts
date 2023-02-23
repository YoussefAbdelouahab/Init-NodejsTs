import { JsonController, Body, Post, UploadedFile, Get, Param, Req, UseBefore} from 'routing-controllers';
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
    async CreateArticle(@Body() data: Article, @Body() data2: File, @UploadedFile("url", { options: multerConfig }) storedFile: any, @Req() req: any) {
        try {
            const article: Article = data;
            const id = req.auth;
            const user: User = await this.userRepository.findOne({ where: {id} });
            article.setStatus(0);
            article.setUser(user);
            if (!article) throw new Error('Article not created');
            await this.articleRepository.save(article);
            if(storedFile){
                const file: File = data2;
                file.setArticle(article)
                file.setUrl(storedFile.filename);
                if (!file) throw new Error('file not created');
                await this.fileRepository.save(file);
                return { success: "Article created with file" };
            }
            return { success: "Article created without file" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/article/:id')
    getArticle(@Param('id') id: string) {
        const article: Article = this.articleRepository.find(id).then(function(result){
            console.log(result);
        });
    }
}