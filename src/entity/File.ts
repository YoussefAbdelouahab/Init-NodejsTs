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
}
