import { Request, Response } from "express";
import ServiceLine from "../model/serviceLine";
import dotenv from "dotenv";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_product, id_service, quantity } = req.body;
    const serviceLine = await ServiceLine.create({ id_product, id_service, quantity });
    res.status(201).json({ message: "Commande ajoutée", serviceLine });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceLines = await ServiceLine.findAll();
    if (serviceLines.length === 0) {
      res.status(404).json({ message: "Aucune Commande à ce jour" });
      return;
    }
    res.status(200).json({ serviceLines });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getServiceLinebyPk = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id_service_line } = req.body;
    const serviceLine = await ServiceLine.findByPk(id_service_line);
    if (!serviceLine) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    }
    res.status(200).json({ serviceLine });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getServiceLinesByIdProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id_product } = req.body;
    const serviceLines = await ServiceLine.findAll({ where: { id_product } });
    if (!serviceLines || serviceLines.length === 0) {
      res.status(404).json({ message: "Aucune commande pour ce client" });
      return;
    }
    res.status(200).json({ serviceLines });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
