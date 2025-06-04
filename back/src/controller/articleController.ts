import { Request, Response } from "express";
import Article from "../model/article";
import dotenv from "dotenv";
import uploadImage from "../function/imageMangement";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) throw new Error("Aucun fichier reçu");
    const isNameTaken = await checkArticleNameExist(req.body.title);
    if (isNameTaken) {
      res.status(409).json({ message: "Un article porte deja ce nom" });
      return;
    }
    const { title, description } = req.body;
    // Chemin Cloudinary
    const folderPath = `articles/${title}`;

    // Upload Cloudinary
    const image = await uploadImage(req.file, folderPath);

    // Création de l'article avec l'URL Cloudinary
    const newObject = await Article.create({ title, image, description });

    const article = newObject.dataValues;

    res.status(201).json({ article });
  } catch (error) {
    console.error("❌ Erreur création article :", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_article } = req.body;
    const article = await Article.findByPk(id_article);
    if (!article) {
      res.status(404).json({ message: "Article inconnue" });
      return;
    }
    res.status(200).json({ article });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const checkArticleNameExist = async (articleName: string): Promise<boolean> => {
  try {
    const article = await Article.findOne({ where: { title: articleName } });
    if (article) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'existence de l'article :", error);
    throw new Error("Erreur lors de la vérification de l'existence de l'article");
  }
};

export const editArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_article, title, image, description } = req.body;
    const article = await Article.findByPk(id_article);

    if (!article) {
      res.status(404).json({ message: "Article non trouvé" });
      return;
    } else {
      article.title = title;
      article.image = image;
      article.description = description;

      await article.save();
      res.status(200).json({ message: "Champ modifié", article });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const activateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_article } = req.body;
    const article = await Article.findByPk(id_article);

    if (!article) {
      res.status(404).json({ message: "Article non trouvé" });
      return;
    }
    article.visible = true;
    await article.save();
    res.status(200).json({ message: "Article activé", article });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
