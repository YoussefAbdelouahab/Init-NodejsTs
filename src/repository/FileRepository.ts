import { File } from '../entity/File';
import { AppDataSource } from '../db/data-source';

export async function DeleteFile(id){
    await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(File)
    .where("id = :id", { id: id })
    .execute()
}