import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index } from "typeorm"
import { FleaMarket } from './FleaMarket';


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
    private zip_code: string

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

    constructor(avatar: string, lastName: string, username: string, mail: string, password: string, phone: number,
        address: string, zip_code: string, city: string, role: string, status: number, alert_count: number,
        created_at: Date, updated_at: Date) {
        this.lastName = lastName;
        this.username = username;
        this.mail = mail;
        this.password = password;
    }
    
}
 