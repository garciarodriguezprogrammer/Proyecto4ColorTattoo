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

//Rutas de gestion 

//Registrar usuarios
app.post("/register", authController.register);  //YA

//Loguear usuarios
app.post("/login", authController.loginUser); //YA

//Listar usuarios 
app.get("/users", usersController.getAll); //YA

//Obtener perfil de usuarios por id
app.get("/userId/:id", usersController.getById); //YA

//Modificar el perfil del usuario
app.patch("/modifyProfile/:id", usersController.modifyProfile); //YA

//Listar tatuadores 
app.get("/artists", usersController.getArtists); //YA

//Crear una cita
app.post("/createAppointment", appointmentsController.createAppointment); //YA

//Listar citas
app.get("/getAppointments", appointmentsController.getAppointments); //YA

//Recuperar citas por su ID 
app.get("/getAppointmentById/:id", appointmentsController.getAppointmentById); //YA

//Modificar cita por ID
app.patch("/modifyAppointment/:id", appointmentsController.modifyAppointment); //YA

//Eliminar cita por ID
app.delete("/deleteAppointment/:id", appointmentsController.deleteAppointment); //YA

//Recuperar citas de cliente por el id del cliente
app.get("/getAppointmentByClient/:id", appointmentsController.getAppointmentByClient); //YA

//Recuperar citas de artista por el id del artista
app.get("/getAppointmentByArtist/:id", appointmentsController.getAppointmentByArtist); //YA


//Para evitar que el servidor crashee cuando se reinicia solo 
process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
        console.log('Server closed');
        // Aquí puedes también cerrar conexiones de base de datos o realizar otras tareas de limpieza
        process.exit(0);
    });
});

