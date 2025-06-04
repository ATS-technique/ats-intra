import { Request, Response } from "express";
import Order from "../model/order";
import dotenv from "dotenv";
import { getClientName } from "../controller/clientController";
import { getUserName } from "../controller/userController";
import { getContactName } from "../controller/contactController";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderCheck = await isOrderExisting(req, res);
    if (orderCheck) {
      res.status(409).json({ message: "Ce numéro de devis est déja attribué" });
      return;
    }
    const {
      id_order,
      id_client,
      quote_number,
      site_name,
      object,
      comment,
      id_contact,
      ordered_at,
      deposit_rate,
      site_address,
      reference,
      id_user,
    } = req.body;
    const order = await Order.create({
      id_order,
      id_client,
      quote_number,
      site_name,
      object,
      comment,
      id_contact,
      ordered_at,
      deposit_rate,
      site_address,
      reference,
      id_user,
    });
    res.status(201).json({ message: "Commande ajoutée", order });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMaxQuoteNumber = async (req: Request, res: Response): Promise<any> => {
  try {
    const maxOrder = await Order.findOne({
      attributes: ["quote_number"],
      order: [["quote_number", "DESC"]],
    });

    const maxQuoteNumber = maxOrder?.quote_number;
    if (!maxOrder) {
      res.status(404).json({ message: "Aucune commande n'a été trouvée" });
      return;
    }
    res.status(200).json({ maxQuoteNumber });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.findAll();
    const ordersWithClientNames = await Promise.all(
      orders.map(async (order) => {
        const client = await getClientName(order.id_client);
        return {
          ...order.toJSON(), // Convertir Sequelize Model en objet JS
          client_name: client ? client.name : "",
        };
      }),
    );
    const ordersWithUserNames = await Promise.all(
      ordersWithClientNames.map(async (orderNames) => {
        const user = await getUserName(orderNames.id_user);
        return {
          // Convertir Sequelize Model en objet json
          ...orderNames,
          user_name: user ? user.name : "",
        };
      }),
    );

    const OrdersWithContactNames = await Promise.all(
      ordersWithUserNames.map(async (orderNames) => {
        const contact = await getContactName(orderNames.id_contact);
        return {
          // Convertir Sequelize Model en objet json
          ...orderNames,
          contact_name: contact ? contact : "",
        };
      }),
    );

    // Sort OrdersWithContactNames by quote_number
    OrdersWithContactNames.sort((a, b) => a.quote_number - b.quote_number);

    res.status(200).json(OrdersWithContactNames);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getOrderbyPk = async (req: Request, res: Response): Promise<any> => {
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

export const isOrderExisting = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id_order } = req.body;
    const order = await Order.findByPk(id_order);
    if (!order) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getOrdersByIdClient = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id_client } = req.body;
    const order = await Order.findAll({ where: { id_client } });
    if (!order) {
      res.status(404).json({ message: "Aucune commande pour ce client" });
      return;
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const validateOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id_order, validated } = req.body;
    const order = await Order.findByPk(id_order);
    if (!order) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    }
    order.validated = validated;
    await order.save();
    res.status(200).json({ message: "Commande validée" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editOrderById = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      id_order,
      id_client,
      site_name,
      ordered_at,
      deposit_rate,
      site_address,
      comment,
      reference,
      id_user,
      object,
    } = req.body;
    const order = await Order.findByPk(id_order);
    if (!order) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    }
    order.id_client = id_client;
    order.site_name = site_name;
    order.ordered_at = ordered_at;
    order.deposit_rate = deposit_rate;
    order.site_address = site_address;
    order.comment = comment;
    order.reference = reference;
    order.id_user = id_user;
    order.object = object;
    await order.save();
    res.status(200).json({ message: "Commande modifiée" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const setBilled = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_order, validated } = req.body;
    const order = await Order.findByPk(id_order);
    if (!order) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    } else if (order.validated === true) {
      res.status(400).json({ message: "La commande est déjà validée" });
      return;
    }
    order.validated = validated;
    await order.save();
    res.status(200).json({ message: "Commande mise à jour" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const setPaid = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_order } = req.body;
    const order = await Order.findByPk(id_order);
    if (!order) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    } else if (order.validated === false) {
      res.status(400).json({ message: "La commande n'est pas validée" });
      return;
    } else if (order.paid === true) {
      res.status(400).json({ message: "La commande est déjà payée" });
      return;
    } else if (order.billed === false) {
      res.status(400).json({ message: "La commande n'est pas facturée" });
      return;
    }
    order.paid = !order.paid;
    await order.save();
    res.status(200).json({ message: "Commande mise à jour" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
