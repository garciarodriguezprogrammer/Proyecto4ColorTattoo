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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const users_1 = require("../entity/users");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET_KEY || "123456789";
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { USER_NAME, EMAIL, PASS, ROL } = req.body;
            try {
                const userExists = yield data_source_1.AppDataSource.getRepository(users_1.Users).findOneBy({ EMAIL });
                if (userExists) {
                    return res
                        .status(400)
                        .json({ message: "This user already exists" });
                }
                //Esto es para enciptar la contraseña
                const hashedPassword = yield bcrypt_1.default.hash(req.body.PASS, 10);
                //Crear usuario con la contraseña ya encriptada
                const newUser = data_source_1.AppDataSource.getRepository(users_1.Users).create({
                    USER_NAME: USER_NAME,
                    EMAIL: EMAIL,
                    PASS: hashedPassword,
                    ROL: ROL
                });
                //Guardar el nuevo usuario
                const saveUser = yield data_source_1.AppDataSource.getRepository(users_1.Users).save(newUser);
                if (!saveUser) {
                    return res.status(500).json({
                        message: "Error saving user"
                    });
                }
                const { PASS: _ } = saveUser, userWithoutPass = __rest(saveUser, ["PASS"]);
                return res.json(userWithoutPass);
            }
            catch (error) {
                //Instanciamos la clase error
                if (error instanceof Error) {
                    return res
                        .status(500)
                        .json({
                        message: "Not registered user",
                        error: error.message
                    });
                }
                else {
                    return res
                        .status(500)
                        .json({
                        message: "unknow_error",
                        error: "unknow_error"
                    });
                }
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { EMAIL, PASS } = req.body;
                const user = yield data_source_1.AppDataSource.getRepository(users_1.Users).findOne({
                    where: { EMAIL: EMAIL }
                });
                if (!user) {
                    return res.status(500).json({
                        message: "This user doesn't exist"
                    });
                }
                const isValidPassword = yield bcrypt_1.default.compare(PASS, user.PASS);
                if (!isValidPassword) {
                    return res.status(500).json({
                        message: "Your email or password is wrong"
                    });
                }
                const token = jsonwebtoken_1.default.sign({ ID_USER: user.ID_USER, ROL: user.ROL }, secretKey, {
                    expiresIn: "1h"
                });
                return res.json({ message: "Succesfully login", token: token });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error login", error
                });
            }
        });
    }
}
exports.AuthController = AuthController;
