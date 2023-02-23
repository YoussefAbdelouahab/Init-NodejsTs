import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from "typeorm"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    private title: string

    @Column({default: 0})
    private id_parent: number

    @CreateDateColumn()
    private created_at: Date

    @UpdateDateColumn()
    private updated_at: Date

    constructor(title: string) {
        this.title = title;
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
    public getId_parent(): number {
        return this.id_parent;
    }
    public setId_parent(id_parent: number): void {
        this.id_parent = id_parent;
    }
    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
}
