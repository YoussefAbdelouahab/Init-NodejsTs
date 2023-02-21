import { JsonController, Body, Post, UploadedFile} from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Article } from '../entity/Article';
import { File } from '../entity/File';
import { multerConfig } from '../config/multer';
@JsonController()
export class ArticleController {
    constructor(public articleRepository, public fileRepository) {
        this.articleRepository = AppDataSource.getRepository(Article);
        this.fileRepository = AppDataSource.getRepository(File);
    }

    @Post('/article')
    async post(@Body() data: Article, @Body() data2: File, @UploadedFile("url", { options: multerConfig }) storedFile: any) {
        try {
            const article: Article = data;
            article.setStatus(0);
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
}