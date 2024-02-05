import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

//Creacion de entidades

@Entity()
export class Users{
    @PrimaryGeneratedColumn()  
    ID_USER: number;

    @Column({length:100})
    USER_NAME: string;

    @Column({length:100})
    EMAIL: string;

    @Column({length:100})
    PASS: string;

    @Column({length:50})
    ROL: string;
}