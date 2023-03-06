import { File } from '../entity/File';
import { Article } from '../entity/Article';
import { AppDataSource } from '../db/data-source';
import { createQueryBuilder } from 'typeorm';
import { ALL, FILE } from 'dns';

export async function deleteFile(id){
    await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(File)
    .where("id = :id", { id: id })
    .execute()
}
//SELECT * FROM article LEFT JOIN file on article.id = file.articleId;
export async function getUserArticle(id){
    //.leftJoin("file.article", 'article', "file.articleId = article.id")
     const articles = await AppDataSource
    .createQueryBuilder()
    .select()
    .from(Article, "article")
    .where("userId = :id", { id: id })
    .leftJoin("article.file", 'file', "article.id = file.articleId")
    .execute()
    console.log(articles);
}