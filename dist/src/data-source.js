"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("./entity/users");
const appointments_1 = require("./entity/appointments");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "Color_Tattoo",
    synchronize: true,
    logging: false,
    entities: [
        users_1.Users, appointments_1.Appointments
    ],
    migrations: [
        __dirname + "/migrations/**/*.ts"
    ]
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Se ha conetado la base de datos");
})
    .catch((error) => {
    console.log("Ha habido un error: " + error);
});
