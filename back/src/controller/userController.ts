import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, mail, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, mail, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ where: { mail } });
    if (!user) {
      res.status(404).json({ message: "Utilisateur inconue" });
      return;
    } else if (user.is_active === false) {
      res.status(400).json({ message: "Ce compte à été désactivé" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Mot de passe incorrect" });
      return;
    }
    const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET as string, { expiresIn: "10h" });
    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk((req as any).user.id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur inconnue" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const activate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur inconnue" });
      return;
    } else if (user.is_active === true) {
      res.status(400).json({ message: "Ce compte est déja actif" });
      return;
    }

    user.is_active = true;
    await user.save();
    res.status(200).json({ message: "Le compte a été réactivé" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deactivate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur inconnue" });
      return;
    } else if (user.is_active === false) {
      res.status(400).json({ message: "Ce compte à déja été désactivé" });
      return;
    }

    user.is_active = false;
    await user.save();
    res.status(200).json({ message: "Le compte a été désactivé", user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updatePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { newPassword, oldPassword, id } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur inconnue" });
      return;
    } else if (user.is_active === false) {
      res.status(400).json({ message: "Ce compte à été désactivé, réactivez le pour le modifier" });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (isMatch) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.status(200).json({ message: "Mot de passe mit à jour" });
      return;
    } else {
      res.status(400).json({ message: "Ancien mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, nameUpdated, mailUpdated } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur inconnue" });
      return;
    } else if (user.is_active === false) {
      res.status(400).json({ message: "Ce compte à été désactivé, réactivez le pour le modifier" });
      return;
    }

    user.name = nameUpdated;
    user.mail = mailUpdated;

    await user.save();
    res.status(200).json({ message: "Informations mise à jour" });
    return;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
