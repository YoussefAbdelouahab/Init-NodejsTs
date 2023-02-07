import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm"
import { Article } from './Article';

@Entity()
export class File {

    @PrimaryGeneratedColumn()
    private id: number

    @Index({ unique: true })
    @Column()
    private url: string

    @Column()
    private created_at: Date

    @Column()
    private updated_at: Date

    @ManyToOne(type => Article) // Init many to one relation with Article
    @JoinColumn() 
    private article: Article; // Join article table with File table

    constructor(url: string, created_at: Date, updated_at: Date) {
        this.url = url;
    }

    public getId(): number {
        return this.id;
    }
    public getUrl(): string {
        return this.url;
    }
    public setUrl(Url: string): void {
        this.url = Url;
    }
    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
    public getArticle(): Article {
        return this.article;
    }
    public setArticle(Article: Article): void {
        this.article = Article;
    }
}
