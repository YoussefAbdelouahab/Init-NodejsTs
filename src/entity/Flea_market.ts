import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Flea_market {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    started_at: Date

    @Column()
    finished_at: Date

    @Column()
    address: string

    @Column()
     zip_code: number

    @Column()
     city: string

    @Column()
     exhibitor_hours: string

    @Column()
     visitor_hours: string

    @Column()
     exhibitor_count : number

    @Column()
     type: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

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
