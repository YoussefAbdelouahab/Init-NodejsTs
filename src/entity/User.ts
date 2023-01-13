import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    private firstName: string

    @Column()
    private lastName: string

    @Column()
    private age: number

    constructor(firstname: string, lastName: string, age: number) {
        this.firstName = firstname;
        this.lastName = lastName;
        this.age = age;
    }

    public getId() {
        this.id;
    }

    public getFirstname() {
        this.firstName;
    }

    public setFirstname(firstName: string) {
        this.firstName = firstName;
    }

    public getLastname() {
        this.lastName;
    }

    public setLastname(lastName: string) {
        this.lastName = lastName;
    }

    public getAge() {
        this.age;
    }

    public setAge(age: number) {
        this.age = age;
    }

}
