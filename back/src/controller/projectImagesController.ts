import ProjectImage from "../model/projectImages";
import { Request, Response } from "express";
import dotenv from "dotenv";
import uploadImage from "../function/imageMangement";

dotenv.config();

const sanitize = (name: string) =>
  name.replace(/[^\w.\-]+/g, "_").toLowerCase();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) throw new Error("Aucun fichier reçu");
        const { id_project } = req.body;

    
        const folderPath = `projects/${id_project}`;
    
        // Upload Cloudinary
        const image = await uploadImage(req.file, folderPath);

    const projectImage = await ProjectImage.create({ id_project, path: image });
    res.status(201).json({ message: "Image de projet ajouté", projectImage });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addMany = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) {
      res.status(400).json({ error: "Aucun fichier reçu" });
      return;
    }

    const { id_project } = req.body as { id_project?: string | number };
    if (!id_project) {
      res.status(400).json({ error: "id_project est requis" });
      return;
    }

    const rows = await addManyImages(id_project, files);

    res.status(201).json({
      message: "Images de projet ajoutées",
      count: rows.length,
      images: rows,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}; 

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectImages = await ProjectImage.findAll();
    if (projectImages.length === 0) {
      res.status(404).json({ message: "Aucune image de projet à ce jour" });
      return;
    }
    res.status(200).json( projectImages );
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjectImagebyPk = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_project_image } = req.body;
    const projectImage = await ProjectImage.findByPk(id_project_image);
    if (!projectImage) {
      res.status(404).json({ message: "Image de projet inconnue" });
      return;
    }
    res.status(200).json({ projectImage });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};      

export const getProjectImageByIdProject = async (id_project: number): Promise<ProjectImage[] | null> => {
    const projectImage = await ProjectImage.findAll({ where: { id_project } });
    if (!projectImage) {
      return null;
    }
    return projectImage as ProjectImage[];

};

export const deleteProjectImageById = async (req: Request, res: Response): Promise<void> => {
   try {    
    const { id_project_image } = req.body;
    await ProjectImage.destroy({ where: { id_project_image } });
    res.status(200).json({ message: "Image de projet supprimé" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addManyImages = async (id_project: number | string , files: Express.Multer.File[]): Promise<ProjectImage[]> => {
  const folderPath = `projects/${id_project}`;

    // 1) uploader chaque fichier
    const uploaded = await Promise.all(
      files.map(async (f, idx) => {
        // dest: dossier + nom horodaté pour éviter les collisions
        const dest = `${folderPath}/${Date.now()}_${idx}_${sanitize(f.originalname)}`;
        const urlOrPath = await uploadImage(f, dest);
        return { id_project, path: urlOrPath, originalname: f.originalname, size: f.size, mimetype: f.mimetype };
      })
    );

    // 2) créer une entrée en BDD par image
    // Si tu veux toutes les infos, adapte le modèle (ex: originalname, mimetype, size…)
    const rows = await ProjectImage.bulkCreate(
      uploaded.map(({ id_project, path }) => ({
        id_project: typeof id_project === "string" ? Number(id_project) : id_project,
        path
      })),
      { returning: true }
    );
    return rows;
};