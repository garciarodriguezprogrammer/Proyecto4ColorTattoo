import { AppDataSource } from "../data-source";
import { Appointments } from "../entity/appointments";
import { Users } from "../entity/users";
import { Request, Response } from "express";

export class AppointmentsController {
    async createAppointment(req: Request, res: Response): Promise<Response> {
        const { ID_CLIENT, ID_ARTIST, DATE_TIME, DESCRIPTION_TATTOO } = req.body;
        console.log(req.body)
        try {
            //Comprobacion de que exista el cliente
            const client = await AppDataSource.getRepository(Users).findOneBy({
                ID_USER: ID_CLIENT
            });

            if (!client) {
                return res.status(404).json({ message: "Client not found" })
            }

            //Comprobacion de que exista el artista
            const artist = await AppDataSource.getRepository(Users).findOneBy({
                ID_USER: ID_ARTIST
            });

            if (!artist) {
                return res.status(404).json({ message: "Artist not found" })
            }
            //Creacion de la cita
            const newAppointment = await AppDataSource.getRepository(Appointments).create({
                DATE_TIME,
                DESCRIPTION_TATTOO,
                ID_CLIENT: client,
                ID_ARTIST: artist
            });

            //Guardar la cita en la base de datos
            const saveAppointment = await AppDataSource.getRepository(Appointments).save(
                newAppointment
            );
            //Para que nos devuelva en consola la cita que hemos guardado
            return res.json(saveAppointment);
        }
        catch(error) {
            return res.status(500).json({ message: "Error creating appointment" });
        }
    }

    //Recuperar los appointments
    async getAppointments(req: Request, res: Response) {
        const appointments = await AppDataSource.getRepository(Appointments).find();
        if (!appointments) {
            return res.status(404).json({
                message: "Appointments not found"
            })
        }
        return res.json(appointments);
    }     
    //Modificar una cita
    async modifyAppointment(req: Request, res: Response): Promise<Response> {
        const ID_APPOINTMENT = parseInt(req.params.id);
        const dates = req.body;

        if(isNaN(ID_APPOINTMENT)) {
            return res.status(400).json({
                message: "Id is not valid"
            });
        }

        try {
            const appointment = await AppDataSource.getRepository(Appointments).findOneBy({ID_APPOINTMENT});
            if(!appointment) {
                return res.status(400).json({
                    message: "Appointment is not found"
                });
            }
            AppDataSource.getRepository(Appointments).merge(appointment, dates);
            const updateAppointment = await AppDataSource.getRepository(Appointments).save(appointment);
            return res.json(updateAppointment);

        } catch(error){
            return res.status(500).json({
                message: "Error updating appointment", error
            });
        }
    }
    //Eliminar una cita
    async deleteAppointment(req: Request, res: Response): Promise<Response> {
        const ID_APPOINTMENT = parseInt(req.params.id);
        if(isNaN(ID_APPOINTMENT)) {
            return res.status(400).json({
                message: "Id is not valid"
            });
        }
        try  {
            const result = await AppDataSource.getRepository(Appointments).delete(ID_APPOINTMENT);
            if(result.affected === 0) {
                return res.status(400).json({
                    message: "Appointment not found"
                });
            }
            return res.status(200).json({
                message: "Appointment deleted succesfully"
            });
        }
        catch(error){
            return res.status(500).json({
                message: "Error deleting appointment", error
            });
        }
    }

        //Recuperar citas de un cliente
    async getAppointmentByClient(req: Request, res: Response) {
        const {id} = req.params;
       
        try {
           const appointments = await AppDataSource.getRepository(Appointments).find({
            where: {ID_CLIENT: {ID_USER: parseInt(id)}}
           })
           return res.json(appointments);
        } catch (error) {
            return res.status(500).json({
                message: "Error getting appointments", error
            });
        }
    }
    //Recuperar citas de un artista
    async getAppointmentByArtist(req: Request, res: Response) {
        const {id} = req.params;
       
        try {
           const appointments = await AppDataSource.getRepository(Appointments).find({
            where: {ID_ARTIST: {ID_USER: parseInt(id)}}
           })
           return res.json(appointments);
        } catch (error) {
            return res.status(500).json({
                message: "Error getting appointments", error
            });
        }
    }
}