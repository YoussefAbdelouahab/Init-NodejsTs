import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Article } from './Article';

@Entity()
export class File {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @ManyToOne(type => Article) // Init many to one relation with Article
    @JoinColumn() 
    article: Article; // Join article table with File table

    constructor(url: string, created_at: Date, updated_at: Date) {
        this.url = url;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
