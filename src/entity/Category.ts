import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    private title: string

    @Column()
    private id_parent: number

    @Column()
    private created_at: Date

    @Column()
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
    public setTitle(title: string): string {
        return this.title = title;
    }
    public getId_parent(): number {
        return this.id_parent;
    }
    public setId_parent(id_parent: number): number {
        return this.id_parent = id_parent;
    }
    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
}
