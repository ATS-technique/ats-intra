import { Request, Response } from "express";
import PressMention from "../model/pressMention";
import dotenv from "dotenv";
import uploadImage from "../function/imageMangement";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) throw new Error("Aucun fichier reçu");
    const { article_name, media_name, article_url, description, date, link_text } = req.body;

    const folderPath = `pressMentions/${article_name}`;

    // Upload Cloudinary
    const image = await uploadImage(req.file, folderPath);

    // Création de l'article avec l'URL Cloudinary
    const newObject = await PressMention.create({
      article_name,
      media_name,
      article_url,
      link_text,
      description,
      date,
      image_path: image,
    });

    const pressMention = newObject.dataValues;

    res.status(201).json({ pressMention });
  } catch (error) {
    console.error("❌ Erreur création article :", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getpressMention = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_press_mention } = req.body;
    const pressMention = await PressMention.findByPk(id_press_mention);
    if (!pressMention) {
      res.status(404).json({ message: "Article inconnue" });
      return;
    }
    res.status(200).json({ pressMention });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const pressMentions = await PressMention.findAll({
      order: [["created_at", "DESC"]],
    });
    console.log("✅ Articles récupérés avec succès");
    res.status(200).json(pressMentions);
  } catch (error) {
    console.log("❌ Erreur lors de la récupération des articles :", error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Erreur serveur" });
  }
};

export const editPressMention = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_press_mention, media_name, article_name, article_url, description, date, link_text } = req.body;
    const pressMention = await PressMention.findByPk(id_press_mention);

    if (!pressMention) {
      res.status(404).json({ message: "Article non trouvé" });
      return;
    } else {
      pressMention.media_name = media_name;
      pressMention.article_name = article_name;
      pressMention.article_url = article_url;
      pressMention.link_text = link_text;
      pressMention.date = date;
      pressMention.description = description;

      if (req.file) {
        const folderPath = `pressMentions/${article_name}`;
        pressMention.image_path = await uploadImage(req.file, folderPath);
      }

      await pressMention.save();
      res.status(200).json({ message: "Article modifié", pressMention });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deletePressMention = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_press_mention } = req.body;
    const pressMention = await PressMention.findByPk(id_press_mention);
    if (!pressMention) {
      res.status(404).json({ message: "Article non trouvé" });
      return;
    }
    await pressMention.destroy();
    res.status(200).json({ message: "Article supprimé" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
