import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { User } from './User';

@Entity()
export class Favorite_list {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User) // Init one to one relation with User
    @JoinColumn() // Join user table with Favorite_list table
    user: User
}
