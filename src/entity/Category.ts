import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    id_parent: number

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    constructor(title: string, id_parent: number, created_at: Date, updated_at: Date) {
        this.title = title;
        this.id_parent = id_parent;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
