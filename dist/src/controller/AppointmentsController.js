"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const data_source_1 = require("../data-source");
const appointments_1 = require("../entity/appointments");
const users_1 = require("../entity/users");
class AppointmentsController {
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID_CLIENT, ID_ARTIST, DATE_TIME, DESCRIPTION_TATTOO } = req.body;
            console.log(req.body);
            try {
                //Comprobacion de que exista el cliente
                const client = yield data_source_1.AppDataSource.getRepository(users_1.Users).findOneBy({
                    ID_USER: ID_CLIENT
                });
                if (!client) {
                    return res.status(404).json({ message: "Client not found" });
                }
                //Comprobacion de que exista el artista
                const artist = yield data_source_1.AppDataSource.getRepository(users_1.Users).findOneBy({
                    ID_USER: ID_ARTIST
                });
                if (!artist) {
                    return res.status(404).json({ message: "Artist not found" });
                }
                //Creacion de la cita
                const newAppointment = yield data_source_1.AppDataSource.getRepository(appointments_1.Appointments).create({
                    DATE_TIME,
                    DESCRIPTION_TATTOO,
                    ID_CLIENT: client,
                    ID_ARTIST: artist
                });
                //Guardar la cita en la base de datos
                const saveAppointment = yield data_source_1.AppDataSource.getRepository(appointments_1.Appointments).save(newAppointment);
                //Para que nos devuelva en consola la cita que hemos guardado
                return res.json(saveAppointment);
            }
            catch (error) {
                return res.status(500).json({ message: "Error creating appointment" });
            }
        });
    }
    //Recuperar los appointments
    getAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield data_source_1.AppDataSource.getRepository(appointments_1.Appointments).find();
            if (!appointments) {
                return res.status(404).json({
                    message: "Appointments not found"
                });
            }
            return res.json(appointments);
        });
    }
    modifyAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID_APPOINTMENT = parseInt(req.params.id);
            const dates = req.body;
            if (isNaN(ID_APPOINTMENT)) {
                return res.status(400).json({
                    message: "Id is not valid"
                });
            }
            try {
                const appointment = yield data_source_1.AppDataSource.getRepository(appointments_1.Appointments).findOneBy({ ID_APPOINTMENT });
                if (!appointment) {
                    return res.status(400).json({
                        message: "Appointment is not found"
                    });
                }
                data_source_1.AppDataSource.getRepository(appointments_1.Appointments).merge(appointment, dates);
                const updateAppointment = yield data_source_1.AppDataSource.getRepository(appointments_1.Appointments).save(appointment);
                return res.json(updateAppointment);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error updating appointment", error
                });
            }
        });
    }
    deleteAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID_APPOINTMENT = parseInt(req.params.id);
            if (isNaN(ID_APPOINTMENT)) {
                return res.status(400).json({
                    message: "Id is not valid"
                });
            }
            try {
                const result = yield data_source_1.AppDataSource.getRepository(appointments_1.Appointments).delete(ID_APPOINTMENT);
                if (result.affected === 0) {
                    return res.status(400).json({
                        message: "Appointment not found"
                    });
                }
                return res.status(200).json({
                    message: "Appointment deleted succesfully"
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error deleting appointment", error
                });
            }
        });
    }
    getAppointmentByClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const appointments = yield data_source_1.AppDataSource.getRepository(appointments_1.Appointments).find({
                    where: { ID_CLIENT: { ID_USER: parseInt(id) } }
                });
                return res.json(appointments);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error getting appointments", error
                });
            }
        });
    }
    getAppointmentByArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const appointments = yield data_source_1.AppDataSource.getRepository(appointments_1.Appointments).find({
                    where: { ID_ARTIST: { ID_USER: parseInt(id) } }
                });
                return res.json(appointments);
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error getting appointments", error
                });
            }
        });
    }
}
exports.AppointmentsController = AppointmentsController;
