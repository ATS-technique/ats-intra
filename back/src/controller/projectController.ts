import Project, { ProjectAttributes } from "../model/project";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { getProjectTypeById } from "./projectTypesController";
import { getProjectImageByIdProject, addManyImages } from "./projectImagesController";
import uploadImage from "../function/imageMangement";


dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.files) throw new Error("Aucun fichier reçu");
        const { id_project_type, name, description } = req.body;

        const folderPath = `projects/${id_project_type}`;

        const filesMap = req.files as {
            cover_image?: Express.Multer.File[];
            images?: Express.Multer.File[];
        };

        if (!filesMap.cover_image) throw new Error("Aucun fichier reçu");
        const image = await uploadImage(filesMap.cover_image[0], folderPath);

        const project = await Project.create({ id_project_type, name, description, cover_image: image });

        if (filesMap.images) {
            await addManyImages(project.id_project, filesMap.images);
        }

        const projectType = await getProjectTypeById(project.id_project_type);
        const projectImages = await getProjectImageByIdProject(project.id_project); 

        project.projectType = projectType ? projectType : "";
        project.project_images = projectImages ? projectImages.map(img => img) : [];

        res.status(201).json({ message: "Projet ajouté", project });
    } catch (error) {
        console.log("🅰️ Error: ", error);
        res.status(500).json({ error: (error as Error).message });
    }
};


export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const projectsRaw = await Project.findAll();

        // Si tu veux renvoyer 404 quand c'est vide, ok, mais c'est souvent plus simple de renvoyer 200 + []
        if (!projectsRaw.length) {
            res.status(200).json([]);
            return;
        }

        // 1) Convertir en objets simples
        const projects = projectsRaw.map(p => p.get({ plain: true }));

        const projectsWithTypeAndImages = await getProjectsDetails(projects);

        res.status(200).json(projectsWithTypeAndImages);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des projets :", error);
        res.status(500).json({ error: (error as Error).message });
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_project, name, description, id_project_type } = req.body;

        const project = await Project.findOne({ where: { id_project } });

        if (!project) {
            res.status(404).json({ message: "Projet inconnu" });
            return;
        }

        project.name = name;
        project.description = description;
        project.id_project_type = id_project_type;

        if (req.file) {
            const folderPath = `projects/${name}`;
            const cover_image = await uploadImage(req.file, folderPath);
            project.cover_image = cover_image;
        }

        await project.save();

        const projectType = await getProjectTypeById(project.id_project_type);
        const projectImages = await getProjectImageByIdProject(project.id_project); 

        project.projectType = projectType ? projectType : "";
        project.project_images = projectImages ? projectImages.map(img => img) : [];

        res.status(200).json({ message: "Projet modifié", project });
    } catch (error) {
        console.error("❌ Erreur lors de la modification du projet :", error);
        res.status(500).json({ error: (error as Error).message });
    }
};


export const getProjectbyPk = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_project } = req.body;
        const project = await Project.findOne({ where: { id_project } });
        if (!project) {
            res.status(404).json({ message: "Projet inconnu" });
            return;
        }

        const projectType = await getProjectTypeById(project.id_project_type);
        const images = await getProjectImageByIdProject(project.id_project);

        project.projectType = projectType ? projectType : "";
        project.project_images = images ? images.map(img => img) : [];

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getProjectByType = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_project_type } = req.params;
    const projects = await Project.findAll({ where: { id_project_type } });

    if (projects.length === 0) {
      res.status(404).json({ message: "Aucun projet pour ce type" });
      return;
    }

    const projectsWithImages = await Promise.all(
      projects.map(async (project) => {
        const plain = project.get({ plain: true }); // important
        const images = await getProjectImageByIdProject(plain.id_project);
        return { ...plain, images: images ?? [] };
      })
    );
    console.log(projectsWithImages[1].images);
    res.status(200).json(projectsWithImages);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjectsDetails = async (projects: ProjectAttributes[]): Promise<Project[]> => {
    const projectsWithType = await Promise.all(
        projects.map(async (project) => {
            const projectType = await getProjectTypeById(project.id_project_type);
            return {
                ...project,
                project_type: projectType ?? null,
            };
        })
    );

    // 3) Joindre les images
    const projectsWithTypeAndImages = await Promise.all(
        projectsWithType.map(async (project) => {
            const projectImages = await getProjectImageByIdProject(project.id_project);
            return {
                ...project,
                project_images: projectImages ?? [],
            };
        })
    );

    return projectsWithTypeAndImages as [];
};

export const getLatestCoverImageByProjectType = async (id_project_type: number): Promise<string | null> => {
    const project = await Project.findOne({
        where: { id_project_type },
        order: [['createdAt', 'DESC']], // ou ['created_at', 'DESC'] selon ton champ
    });
    if (!project) {
        return null;
    }

    return project.cover_image? project.cover_image : null;
};