import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { User } from './User';

@Entity()
export class FavoriteList {

    @PrimaryGeneratedColumn()
    private id: number

    @OneToOne(() => User) // Init one to one relation with User
    @JoinColumn() // Join user table with FavoriteList table
    private user: User
    
    public getId(): number {
        return this.id;
    }
}
