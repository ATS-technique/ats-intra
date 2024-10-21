import { Request, Response } from "express";
import Order from "../model/order";
import dotenv from "dotenv";

dotenv.config();


export const add = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_client, site_name, ordered_at, id_deposit, site_address } = req.body;
      const user = await Order.create({ id_client, site_name, ordered_at, id_deposit, site_address });
      res.status(201).json({ message: "Commande ajoutée", user });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try{
        const orders = await Order.findAll();
        if (orders.length === 0) {
            res.status(404).json({ message: "Aucune Commande à ce jour" });
            return;
        }
        res.status(200).json({ orders });
    }catch(error){
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getOrderbyPk = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_order } = req.body;
      const order = await Order.findByPk(id_order);
      if (!order) {
        res.status(404).json({ message: "Commande inconnue" });
        return;
      }
      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
};

export const getOrderByIdClient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_client } = req.body;
        const order = await Order.findAll({ where: { id_client } });
        if (!order) {
            res.status(404).json({ message: "Aucune commande pour ce client" });
            return;
        }
          res.status(200).json({ order });
    }catch(error) {
        res.status(500).json({ error: (error as Error).message });
    }
};