import { JsonController, Body, Post, UploadedFile, Get, Param, Req, UseBefore, Put, UploadedFiles, Delete } from 'routing-controllers';
import { DeleteFile } from '../repository/FileRepository'
import { AppDataSource } from '../db/data-source';
import { Article } from '../entity/Article';
import { File } from '../entity/File';
import { multerConfig } from '../config/multer';
import { User } from '../entity/User';
import { AuthMiddelware } from '../middleware/auth';
import * as fs from 'fs';
import * as path from 'path';
@JsonController()
export class ArticleController {
    constructor(public articleRepository, public fileRepository, public userRepository) {
        this.articleRepository = AppDataSource.getRepository(Article);
        this.fileRepository = AppDataSource.getRepository(File);
        this.userRepository = AppDataSource.getRepository(User);
    }

    @Post('/article')
    @UseBefore(AuthMiddelware)
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
            }else{
                this.fileRepository.save({...file, article: article, url: storedFile[0].filename});
            }

            /*Return response*/
            return { success: "Article created" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/article/:id')
    @UseBefore(AuthMiddelware)
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
    @UseBefore(AuthMiddelware)
    async updateArticle(@Body() data: Article, @UploadedFiles("url", { options: multerConfig }) storedFile: Array<any>, @Param('id') id: string) {
        try{
            const article: Article = await this.articleRepository.findOne({ where: {id: id} })
            if (!article) throw new Error('Article not found');
            const file: File = await this.fileRepository.find({
                relations: ["article"],
                where: { article: { id: article.getId()} }
            })
            if (!file) throw new Error('File not found');
            
            //Delete files from app and db
            file.forEach(element => {
                const fichier = path.resolve('src', 'media', element.getUrl());
                DeleteFile(element.getId());
                fs.unlink(fichier, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Delete file successfully.");
                });
            });

            //Reupload datas in db
            await this.articleRepository.save({ ...article, ...data });
            if(storedFile.length > 0){
                if (storedFile.length > 1) {
                    storedFile.forEach(element => {
                        this.fileRepository.save({ ...file, article: article, url: element.filename });
                    });
                } else {
                    this.fileRepository.save({ ...file, article: article, url: storedFile[0].filename });
                }
            }
            return { success: "article updated" }
        } catch(err){
            return { error: err.message }
        }
    }
    
    @Delete('/article/:id')
    @UseBefore(AuthMiddelware)
    async deleteArticle(@Param('id') id: string) {
        try {
            const article: Article = await this.articleRepository.findOne({ where: {id: id} })
            if (!article) throw new Error('Article not found');
            const file: File = await this.fileRepository.find({
                relations: ["article"],
                where: { article: { id: article.getId()} }
            })
            if (!file) throw new Error('File not found');

            //Delete files from app and db
            file.forEach(element => {
                const fichier = path.resolve('src', 'media', element.getUrl());
                DeleteFile(element.getId());
                fs.unlink(fichier, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("File deleted successfully.");
                });
            });
            await this.articleRepository.remove(article);
            return { success: "Article deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }
}