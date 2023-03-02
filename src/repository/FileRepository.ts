import { File } from '../entity/File';
import { Article } from '../entity/Article';
import { AppDataSource } from '../db/data-source';
import { createQueryBuilder } from 'typeorm';

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
    const article = await AppDataSource
    .createQueryBuilder()
    .select("*")
    .from(Article, "article")
    .where("article.userId = :id", {id: id})
    .innerJoin(File, "file")
    .where("articleId = :id", {id: "article.id"})
    .getMany()

    console.log(article);
}