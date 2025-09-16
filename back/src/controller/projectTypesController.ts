import ProjectType from "../model/projectType";
import e, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const projectType = await ProjectType.create({ name });
    res.status(201).json({ message: "Type de projet ajouté", projectType });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};



export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectTypes = await ProjectType.findAll();
    if (projectTypes.length === 0) {
      res.status(404).json({ message: "Aucun type de projet à ce jour" });
      return;
    }
    res.status(200).json( projectTypes );
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjectTypebyPk = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_project_type } = req.body;
    const projectType = await ProjectType.findOne({ where: { id_project_type: id_project_type } });
    if (!projectType) {
      res.status(404).json({ message: "Type de projet inconnu" });
      return;
    }
    res.status(200).json({ projectType });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};      

export async function getProjectTypeById(id_project_type: number): Promise<string | null> {
    const projectType = await ProjectType.findOne({ where: { id_project_type: id_project_type } });
    return projectType ? projectType.name : null;
}