import { Request, Response } from "express";
import Client from "../model/client";
import dotenv from "dotenv";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, pro, tel, mail, address, city, post_code, siren } = req.body;
    const client = await Client.create({ name, pro, tel, mail, address, city, post_code, siren });
    res.status(201).json({ message: "Client ajouté", client });
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

export const getClientName = async (id_client: number): Promise<Client> => {
  try {
    const client = await Client.findByPk(id_client);
    if (!client) {
      throw new Error("Client inconnue");
    }
    return client;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_client, address, city, mail, name, post_code, pro, siren, tel } = req.body;
    const client = await Client.findByPk(id_client);

    if (!client) {
      res.status(404).json({ message: "Client non trouvé" });
      return;
    } else {
      client.address = address;
      client.city = city;
      client.mail = mail;
      client.name = name;
      client.post_code = post_code;
      client.pro = pro;
      client.siren = siren;
      client.tel = tel;
      await client.save();
      res.status(200).json({ message: "Champ modifié", client });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
