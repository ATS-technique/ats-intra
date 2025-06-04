import { Request, Response } from "express";
import Tag from "../model/tag";
import dotenv from "dotenv";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const tag = await Tag.create({ name });
    res.status(201).json({ message: "Tag ajouté", tag });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error("❌ Erreur récupération des tags :", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_tag } = req.body;
    const tag = await Tag.findByPk(id_tag);
    if (!tag) {
      res.status(404).json({ message: "Tag inconnue" });
      return;
    }
    res.status(200).json({ tag });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_tag, name } = req.body;
    const tag = await Tag.findByPk(id_tag);

    if (!tag) {
      res.status(404).json({ message: "Tag non trouvé" });
      return;
    } else {
      tag.name = name;

      await tag.save();
      res.status(200).json({ message: "Tag modifié", tag });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
