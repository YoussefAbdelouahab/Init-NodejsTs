import { File } from '../entity/File';
import { Article } from '../entity/Article';
import { AppDataSource } from '../db/data-source';

export async function deleteFile(id){
    await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(File)
    .where("id = :id", { id: id })
    .execute()
}

export function getUserArticle(id){
     const articles = AppDataSource
    .createQueryBuilder()
    .select()
    .from(Article, "article")
    .where("userId = :id", { id: id })
    .leftJoin("article.file", 'file', "article.id = file.articleId")
    .execute()
    return articles;
}

export function getAllArticle(){
    const article = AppDataSource
   .createQueryBuilder()
   .select()
   .from(Article, "article")
   .leftJoin("article.file", 'file', "article.id = file.articleId")
   .execute()
   return article;
}