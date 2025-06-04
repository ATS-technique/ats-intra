import { Request, Response } from "express";
import Product from "../model/product";
import dotenv from "dotenv";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_order, designation, quantity, id_status, unit } = req.body;
    const user = await Product.create({ id_order, designation, quantity, id_status, unit });
    res.status(201).json({ message: "Produit ajoutée", user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll();
    if (products.length === 0) {
      res.status(404).json({ message: "Aucun produit à ce jour" });
      return;
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProductbyPk = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_product } = req.body;
    const product = await Product.findByPk(id_product);
    if (!product) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const getProductByOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_order } = req.params;
    const product = await Product.findAll({ where: { id_order } });
    if (!product) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
