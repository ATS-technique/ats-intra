import { Request, Response } from "express";
import Contact from "../model/contact";
import dotenv from "dotenv";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_client, name, mail, mobile, landline } = req.body;
    const contact = await Contact.create({ id_client, name, mail, mobile, landline });
    res.status(201).json({ message: "Contact ajoutée", contact });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.findAll();
    if (contacts.length === 0) {
      res.status(404).json({ message: "Aucun produit à ce jour" });
      return;
    }
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getContactName = async (id_contact: number): Promise<string | null> => {
  try {
    const contact = await Contact.findByPk(id_contact);
    if (!contact) {
      return null;
    }
    return contact.name;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getContactbyPk = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_contact } = req.body;
    const contact = await Contact.findByPk(id_contact);
    if (!contact) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    }
    res.status(200).json({ contact });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const getContactsByIdClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_client } = req.params;
    console.log(" id_client", id_client);
    const contacts = await Contact.findAll({ where: { id_client } });
    if (!contacts) {
      res.status(404).json({ message: " Aucun contact pour ce client" });
      return;
    }
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
