import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Localisation } from './Localisation';

@Entity()
export class FleaMarket {

    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    private title: string

    @Column()
    private event_date: Date

    @Column()
    private address: string

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

    @Column()
    private status: number

    @ManyToOne(type => Localisation) 
    @JoinColumn() 
    private localisation: Localisation; 

    constructor(title: string, event_date: Date, address: string, exhibitor_hours: string,
        visitor_hours: string, type: string) {
        this.title = title;
        this.event_date = event_date;
        this.address = address;
        this.exhibitor_hours = exhibitor_hours;
        this.visitor_hours = visitor_hours;
        this.type = type;
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
    public getEvent_date(): Date {
        return this.event_date;
    }
    public setEvent_date(event_date: Date): void {
        this.event_date = event_date;
    }
    public getAddress(): string {
        return this.address;
    }
    public setAddress(Address: string): void {
        this.address = Address;
    }
    public getExhibitor_hours(): string {
        return this.exhibitor_hours;
    }
    public setExhibitor_hours(exhibitor_hours: string): void {
        this.exhibitor_hours = exhibitor_hours;
    }
    public getVisitor_hours(): string {
        return this.visitor_hours;
    }
    public setVisitor_hours(visitor_hours: string): void {
        this.visitor_hours = visitor_hours;
    }
    public getExhibitor_count(): number {
        return this.exhibitor_count;
    }
    public setExhibitor_count(exhibitor_count: number): void {
        this.exhibitor_count = exhibitor_count;
    }
    public getType(): string {
        return this.type;
    }
    public setType(type: string): void {
        this.type = type;
    }
    public getStatus(): number {
        return this.status;
    }
    public setStatus(status: number): void {
        this.status = status;
    }
    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
    public getLocalisation(): Localisation {
        return this.localisation;
    }
    public setLocalisation(Localisation: Localisation) {
        this.localisation = Localisation;
    }

}
