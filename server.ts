import express from "express";
import { UsersController } from "./src/controller/UsersController";
import { createConnection } from "mysql2";
import { AuthController } from "./src/controller/AuthController";
import { AppointmentsController } from "./src/controller/AppointmentsController";

const app = express();
const port = process.env.PORT || 3000;
const usersController = new UsersController();
const authController = new AuthController();
const appointmentsController = new AppointmentsController();

app.use(express.json());

const server = app.listen(port, () => {
    console.log("Server is running")
});

//Rutas de gestion de usuarios (registrar, loguear y listar)
app.get("/users", usersController.getAll);
app.post("/register", authController.register);
app.post("/login", authController.loginUser);

//Obtener usuarios por id
app.get("/userId/:id", usersController.getById);

//Obtener tatuadores 
app.get("/artists", usersController.getArtists);

//Crear una cita
app.post("/createAppointment", appointmentsController.createAppointment);

//Recuperar citas
app.get("/getAppointments", appointmentsController.getAppointments);

//Modificar  cita por ID
app.put("/modifyAppointment/:id", appointmentsController.modifyAppointment);

//Eliminar cita por ID
app.delete("/deleteAppointment/:id", appointmentsController.deleteAppointment);

//Recuperar citas de cliente
app.get("/getAppointmentByClient/:id", appointmentsController.getAppointmentByClient);

//Recuperar citas de artista
app.get("/getAppointmentByArtist/:id", appointmentsController.getAppointmentByArtist);


//Para evitar que el servidor crashee cuando se reinicia solo 
process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
        console.log('Server closed');
        // Aquí puedes también cerrar conexiones de base de datos o realizar otras tareas de limpieza
        process.exit(0);
    });
});

