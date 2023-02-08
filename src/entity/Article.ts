import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn,UpdateDateColumn } from "typeorm"
import { User } from './User';
import { FavoriteList } from './FavoriteList';
import { Category } from './Category';


@Entity()
export class Article {
    
    @PrimaryGeneratedColumn()
    private id: number
    
    @Column()
    private title: string

    @Column()
    private content: string

    @Column()
    private price: number

    @Column()
    private status: number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    private created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    private updated_at: Date;
     
    @ManyToOne(type => User) // Init many to one relation with User
    @JoinColumn() 
    private user: User; // Join user table with Article table

    @ManyToMany(() => FavoriteList) // Init many to many relation with FavoriteList
    @JoinTable({
        name: "article_favoritelist"
    })
    private FavoriteList: FavoriteList[] // Join FavoriteList table with Article table
    
    @ManyToMany(() => Category) // Init many to many relation with Category
    @JoinTable({
        name: "article_category"
    })
    private category: Category[] // Join category table with Article table

    constructor(title: string, content: string, price: number) {
        this.title = title;
        this.content = content;
        this.price = price;
    }

    public getId(): number {
        return this.id;
    }
    public getTitle(): string {
        return this.title;
    }
    public setTitle(title: string): void {
        this.title = title;
    }
    public getContent(): string {
        return this.content;
    }
    public setContent(content: string): void {
        this.content = content;
    }
    public getPrice(): number {
        return this.price;
    }
    public setPrice(price: number): void {
        this.price = price;
    }
    public getStatus(): number {
        return this.status;
    }
    public setStatus(status: number) {
        this.status = status;
    }
    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
    //Getters et setters de relations
    public getUser(): User {
        return this.user;
    }
    public setUser(User: User) {
        this.user = User;
    }
    public getFavoriteList(): FavoriteList[] {
        return this.FavoriteList;
    }
    public setFavoriteList(FavoriteList: FavoriteList[]) {
        this.FavoriteList = FavoriteList;
    }
    public getCategory(): Category[] {
        return this.category;
    }
    public setCategory(category: Category[]) {
        this.category = category;
    }
}
