import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    private id: number

    @Column()
    private firstName: string

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

    private roles;

    constructor(firstname: string, lastName: string, username: string, mail: string, password: string) {
        this.firstName = firstname;
        this.lastName = lastName;
        this.username = username;
        this.mail = mail;
        this.password = password;
    }

    public getId(): number {
        return this.id;
    }
    public getFirstname(): string {
        return this.firstName;
    }
    public setFirstname(firstName: string): void {
        this.firstName = firstName;
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
    public getMail(): string {
        return this.mail;
    }
    public setMail(mail: string): void {
        this.mail = mail;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(password: string): void {
        this.password = password;
    }

    public getRoles(){
        this.roles = ['USER', 'ADMIN'];
        return this.roles;
    }
}
