import { AppDataSource } from "./../data-source";
import {Response, Request} from "express";
import {Users} from "../entity/users";

export class UsersController{
   async getAll(req: Request, res: Response){
    const users = await AppDataSource.getRepository(Users).find();

    return res.json(users);
   }
   //Recuperar un usuario por ID
   async getById(req: Request, res: Response){
      const ID_USER = parseInt(req.params.id);

      if (isNaN(ID_USER)) {
         return res.status(400).json({
            message: "Invalid ID"
         });
      }

      const user = await AppDataSource.getRepository(Users).findOne({
         where:{ID_USER}  
      });

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         });
      }

      return res.json(user);
   }
      //Recuperar artistas
   async getArtists(req: Request, res: Response){
      const rol = "Artist";
      const artists = await AppDataSource.getRepository(Users).find({
         where: {ROL: rol}
      });

      if (artists) {
         return res.json(artists);
      }
      else {
         return res.json({message:"error recovering artists"})
      }
   }

   async modifyProfile(req: Request, res: Response){
      const id = parseInt(req.params.id);
      const profileData = req.body;

      try {
         const profile = await AppDataSource.getRepository(Users).findOneBy({ID_USER: id});
         if (!profile) {
            return res.status(404).json({
               message: "User not found"
            });
         }
         AppDataSource.getRepository(Users).merge(profile, profileData);
         const updatedUser = await AppDataSource.getRepository(Users).save(profile);
         return res.json(updatedUser);
      } catch (error) {
         return res.status(500).json({
            message: "Error updating profile"
         });
      }
      
   }

}


