import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index, ManyToOne, JoinColumn } from "typeorm"
import { FleaMarket } from './FleaMarket';
import { Localisation } from './Localisation';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    private id: number

    @Index({ unique: true })
    @Column()
    private avatar: string

    @Column()
    private lastName: string

    @Index({ unique: true })
    @Column()
    private username: string
    
    @Index({ unique: true })
    @Column()
    private mail: string

    @Column()
    private password: string

    @Index({ unique: true })
    @Column()
    private phone: number

    @Column()
    private address: string
    
    @Column()
    private zip_code: number

    @Column()
    private city: string

    @Column()
    private role: string

    @Column()
    private status: number

    @Column()
    private alert_count: number
    
    @Column()
    private created_at: Date

    @Column()
    private updated_at: Date

    @ManyToMany(() => FleaMarket) // Init many to many relation with FleaMarket
    @JoinTable({
        name: "user_fleamarket"
    })
    private FleaMarket: FleaMarket[] // Join FleaMarket table with User table

    @ManyToOne(type => Localisation) // Init many to one relation with User
    @JoinColumn() 
    private localisation: Localisation; // Join user table with Article table

    constructor(lastName: string, username: string, mail: string, password: string) {
        this.lastName = lastName;
        this.username = username;
        this.mail = mail;
        this.password = password;
    }

    public getId(): number {
        return this.id;
    }
    public getAvatar(): string {
        return this.avatar;
    }
    public setAvatar(avatar: string): void {
        this.avatar = avatar;
    }
    public getLastName(): string {
        return this.lastName;
    }
    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }
    public getUsername(): string {
        return this.username;
    }
    public setUsername(username: string): void {
        this.username = username;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(password: string): void {
        this.password = password;
    }
    public getMail(): string {
        return this.mail;
    }
    public setMail(Mail: string): void {
        this.mail = Mail;
    }
    public getPhone(): number {
        return this.phone;
    }
    public setPhone(Phone: number): void {
        this.phone = Phone;
    }
    public getAddress(): string {
        return this.address;
    }
    public setAddress(Address: string): void {
        this.address = Address;
    }
    public getZip_code(): number {
        return this.zip_code;
    }
    public setZip_code(zip_code: number): void {
        this.zip_code = zip_code;
    }
    public getCity(): string {
        return this.city;
    }
    public setCity(city: string): void {
        this.city = city;
    }
    public getRole(): string {
        return this.role;
    }
    public setRole(role: string): void {
        this.role = role;
    }
    public getStatus(): number {
        return this.status;
    }
    public setStatus(status: number): void {
        this.status = status;
    }
    public getAlert_count(): number {
        return this.alert_count;
    }
    public setAlert_count(alert_count: number): void {
        this.alert_count = alert_count;
    }
    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
    public getFleaMarket(): FleaMarket[] {
        return this.FleaMarket;
    }
    public setCategory(FleaMarket: FleaMarket[]) {
        this.FleaMarket = FleaMarket;
    }
    public getLocalisation(): Localisation {
        return this.localisation;
    }
    public setLocalisation(Localisation: Localisation) {
        this.localisation = Localisation;
    }
    
}
 