import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm"
import { Article } from './Article';
import { User } from './User';

@Entity()
export class Reservation {
    
    @PrimaryGeneratedColumn()
    private id: number
    
    @Column()
    private end: Date

    @Column()
    private created_at: Date

    @Column()
    private updated_at: Date

    @Column()
    private status: number

    @OneToOne(() => Article) // Init one to one relation with User
    @JoinColumn() // Join user table with FavoriteList table
    private article: Article

    @ManyToOne(type => User) // Init many to one relation with Article
    @JoinColumn() 
    private user: User;

    constructor(end: Date, status: number) {
        this.end = end;
        this.status = status;
    }

    public getId(): number {
        return this.id;
    }
    public getEnd(): Date {
        return this.end;
    }
    public setEnd(end: Date): void {
        this.end = end;
    }
    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
    public getStatus(): number {
        return this.status;
    }
    public setStatus(status: number): void {
        this.status = status;
    }

    public getArticle(): Article {
        return this.article;
    }
    public setArticle(article: Article) {
        this.article = article;
    }
    public getUser(): User {
        return this.user;
    }
    public setUser(user: User) {
        this.user = user;
    }
}
