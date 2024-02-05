import {DataSource} from "typeorm";
import { Users } from "./entity/users";
import { Appointments } from "./entity/appointments";
import { toASCII } from "punycode";

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "Color_Tattoo",
    synchronize: true,
    logging: false,
    entities: [
        Users, Appointments
    ],
    migrations: [
        __dirname +"/migrations/**/*.ts"
    ]
   

});

AppDataSource.initialize ()
    .then(()=>{
        console.log ("Se ha conetado la base de datos")
    })
    .catch((error)=>{
        console.log ("Ha habido un error: "+ error)
    })