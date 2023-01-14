import { TinyIntegerDataType } from "sequelize";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Flea_market } from './Flea_market';


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    avatar: string

    @Column()
    lastName: string

    @Column()
    username: string
    
    @Column()
    mail: string

    @Column()
    password: string

    @Column()
    phone: number

    @Column()
    address: string
    
    @Column()
    zip_code: string

    @Column()
    city: string

    @Column()
    role: string

    @Column()
    status: number

    @Column()
    alert_count: number
    
    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @ManyToMany(() => Flea_market) // Init many to many relation with Flea_market
    @JoinTable()
    flea_market: Flea_market[] // Join flea_market table with User table

    constructor(avatar: string, lastName: string, username: string, mail: string, password: string, phone: number,
        address: string, zip_code: string, city: string, role: string, status: number, alert_count: number,
        created_at: Date, updated_at: Date) {
        this.avatar = avatar;
        this.lastName = lastName;
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.zip_code = zip_code;
        this.city = city;
        this.role = role;
        this.status = status;
        this.alert_count = alert_count;
        this.avatar = avatar;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
