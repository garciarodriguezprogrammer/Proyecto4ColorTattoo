import {Request, Response} from "express";
import { Users } from "../entity/users";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "123456789";
//Clase  que  se  encarga  de la autenticacion de los usuarios
export class AuthController{     
    //Funcion  para  registrar  usuarios
    async register(req: Request, res: Response): Promise <void|Response<any>> {   

        const {USER_NAME, EMAIL, PASS, ROL} = req.body;

        try {
            const userExists = await AppDataSource.getRepository(Users).findOneBy({EMAIL});
            if (userExists){
                return res
                .status(400)
                .json({message: "This user already exists"})
            }
            //Esto es para encriptar la contraseña
            const hashedPassword = await bcrypt.hash(req.body.PASS, 10); 
            //Crear usuario con la contraseña ya encriptada
            const newUser = AppDataSource.getRepository(Users).create({
                USER_NAME: USER_NAME, 
                EMAIL: EMAIL,
                PASS: hashedPassword,
                ROL: ROL
                
            });

            //Guardar  el  nuevo  usuario
            const saveUser = await AppDataSource.getRepository(Users).save(newUser);
            if (!saveUser){
                return res.status(500).json({
                    message: "Error saving user"
                })
            }
            const {PASS: _,...userWithoutPass} = saveUser;
            return res.json(userWithoutPass);
        }
        catch (error) {
             //Instanciamos la clase error
            if (error instanceof Error){
                return res 
                .status(500)
                .json({
                    message: "Not registered user", 
                    error: error.message
                });
            } else {
                return res 
                .status(500)
                .json({
                    message: "unknow_error", 
                    error: "unknow_error"
                });
            }  
        }
    }
    //Metodo  para  loguear  un usuario
    async loginUser(req: Request, res: Response): Promise <Response>{
        try {
            const {EMAIL, PASS} = req.body;
            const user = await AppDataSource.getRepository(Users).findOne({
                where: {EMAIL: EMAIL}
            });
            if (!user){
                return res.status(500).json({
                    message: "This user doesn't exist"
                });
            }

            const isValidPassword = await bcrypt.compare(PASS, user.PASS);
            if (!isValidPassword) {
                return res.status(500).json({
                    message: "Your email or password is wrong"
                });
            
            }

            const token = jwt.sign({ID_USER: user.ID_USER, ROL: user.ROL}, secretKey, {
                expiresIn: "1h"
            });

            return res.json({message: "Succesfully login", token: token});
        }

        catch(error) {
            return res.status(500).json({
                message: "Error login", error
            })
        }
    }
}