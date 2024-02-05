import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Users} from "./users";

@Entity()
export class Appointments{
    @PrimaryGeneratedColumn()
    ID_APPOINTMENT: number;

    @ManyToOne(()=>Users, users=> users.ID_USER)  //hago referencia a un campo de otra tabla
    ID_CLIENT: Users;  //hacemos referencia a id_user
    
    @ManyToOne(()=>Users, users=> users.ID_USER)
    ID_ARTIST: Users;

    @Column("timestamp")
    DATE_TIME: Date;

    @Column("text")
    DESCRIPTION_TATTOO: string;
}


