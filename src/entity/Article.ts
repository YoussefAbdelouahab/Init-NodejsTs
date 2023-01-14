import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { User } from './User';
import { Favorite_list } from './Favorite_list';
import { Category } from './Category';


@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    price: number

    @Column()
    status: number

    @ManyToOne(type => User) // Init many to one relation with User
    @JoinColumn() 
    user: User; // Join user table with Article table

    @ManyToMany(() => Favorite_list) // Init many to many relation with Favorite_list
    @JoinTable()
    favorite_list: Favorite_list[] // Join favorite_list table with Article table
    
    @ManyToMany(() => Category) // Init many to many relation with Category
    @JoinTable()
    category: Category[] // Join category table with Article table

    constructor(title: string, content: string, price: number, status: number) {
        this.title = title;
        this.content = content;
        this.price = price;
        this.status = status;
    }
}
