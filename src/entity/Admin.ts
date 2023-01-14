import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    username: string

    @Column()
    password: string
    constructor(firstname: string, lastName: string, username: string, password: string) {
        this.firstName = firstname;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}
