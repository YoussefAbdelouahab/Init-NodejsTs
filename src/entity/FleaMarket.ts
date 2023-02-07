import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class FleaMarket {

    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    private title: string

    @Column()
    private started_at: Date

    @Column()
    private finished_at: Date

    @Column()
    private address: string

    @Column()
    private zip_code: number

    @Column()
    private city: string

    @Column()
    private exhibitor_hours: string

    @Column()
    private visitor_hours: string

    @Column()
    private exhibitor_count: number

    @Column()
    private type: string

    @Column()
    private created_at: Date

    @Column()
    private updated_at: Date

    constructor(title: string, started_at: Date, finished_at: Date,
        address: string, zip_code: number, city: string, exhibitor_hours: string,
        visitor_hours: string, exhibitor_count: number, type: string,
        created_at: Date, updated_at: Date) {
        this.title = title;
        this.started_at = started_at;
        this.finished_at = finished_at;
        this.address = address;
        this.zip_code = zip_code;
        this.city = city;
        this.exhibitor_hours = exhibitor_hours;
        this.visitor_hours = visitor_hours;
        this.exhibitor_count = exhibitor_count;
        this.type = type;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

}
