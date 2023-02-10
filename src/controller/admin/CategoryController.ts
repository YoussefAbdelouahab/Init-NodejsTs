import {JsonController} from "routing-controllers";
import {AppDataSource} from "../../db/data-source";
import {Category} from "../../entity/Category";


@JsonController()
export class CategoryController {

    constructor(private categoryRepository) {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }
}