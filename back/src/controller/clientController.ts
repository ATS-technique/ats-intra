import { Request, Response } from "express";
import Client from "../model/client";
import dotenv from "dotenv";

dotenv.config();


export const add = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, pro, tel, mail, address, city, post_code, siren  } = req.body;
      const user = await Client.create({ name, pro, tel, mail, address, city, post_code, siren });
      res.status(201).json({ message: "Client ajouté", user });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
};

export const getClient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_client } = req.body;
      const client = await Client.findByPk(id_client);
      if (!client) {
        res.status(404).json({ message: "Client inconnue" });
        return;
      }
      res.status(200).json({ client });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };