import { Request, Response } from "express";
import ArticleTag from "../model/articlesTags";
import dotenv from "dotenv";
import Tag from "../model/tag";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_article, id_tag } = req.body;
    const article_tag = await ArticleTag.create({ id_article, id_tag });
    res.status(201).json({ message: "Article ajouté", article_tag });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getArticleTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_article } = req.body;
    const article_tags = await ArticleTag.findAll({ where: { id_article } });
    if (!article_tags) {
      res.status(404).json({ message: "Auncun tag pour cet article" });
      return;
    }
    article_tags.forEach(async (article_tag) => {
      const tag = await Tag.findByPk(article_tag.id_tag);
      if (tag) {
        article_tag.name = tag.name;
      }
    });
    res.status(200).json({ article_tags });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
