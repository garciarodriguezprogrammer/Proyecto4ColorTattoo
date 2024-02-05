"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointments = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("./users");
let Appointments = class Appointments {
};
exports.Appointments = Appointments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointments.prototype, "ID_APPOINTMENT", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.Users, users => users.ID_USER) //hago referencia a un campo de otra tabla
    ,
    __metadata("design:type", users_1.Users)
], Appointments.prototype, "ID_CLIENT", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.Users, users => users.ID_USER),
    __metadata("design:type", users_1.Users)
], Appointments.prototype, "ID_ARTIST", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp"),
    __metadata("design:type", Date)
], Appointments.prototype, "DATE_TIME", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Appointments.prototype, "DESCRIPTION_TATTOO", void 0);
exports.Appointments = Appointments = __decorate([
    (0, typeorm_1.Entity)()
], Appointments);
