import { Request, Response } from "express";
import WorkshopPlanning from "../model/workshopPlanning";
import dotenv from "dotenv";
import { where, Op } from "sequelize";
import { workerData } from "worker_threads";

dotenv.config();

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_product, id_welder, priority } = req.body;
    const workshopPlanningItems = await WorkshopPlanning.findAll({
      where: {
        id_welder: id_welder,
        priority: {
          [Op.gte]: priority,
        },
      },
    });

    if (workshopPlanningItems.length > 0) {
      for (let i = 0; i < workshopPlanningItems.length; i++) {
        workshopPlanningItems[i].priority = workshopPlanningItems[i].priority + 1;
        await workshopPlanningItems[i].save();
      }
    }
    const workshopPlanning = await WorkshopPlanning.create({ id_product, id_welder, priority });
    res.status(201).json({ message: "Ajouté au planning", workshopPlanning, workshopPlanningItems });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editPriority = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_workshop_planning, id_welder, newPriority } = req.body;
    const workshopPlanning = await WorkshopPlanning.findByPk(id_workshop_planning);
    if (id_welder != workshopPlanning?.id_welder) {
      res.status(409).json({ message: "La tache ne correspond pas à la personne spécifiée" });
      return;
    }
    if (workshopPlanning) {
      if (workshopPlanning.priority > newPriority) {
        const workshopPlanningItems = await WorkshopPlanning.findAll({
          where: {
            id_welder: id_welder,
            priority: {
              [Op.lt]: workshopPlanning.priority,
              [Op.gte]: newPriority,
            },
          },
        });
        if (workshopPlanningItems.length > 0) {
          for (let i = 0; i < workshopPlanningItems.length; i++) {
            workshopPlanningItems[i].priority = workshopPlanningItems[i].priority + 1;
            await workshopPlanningItems[i].save();
          }
        }
        workshopPlanning.priority = newPriority;
        workshopPlanning.save();

        res.status(200).json({ message: "Planning mit à jour" });
        return;
      } else if (workshopPlanning.priority < newPriority) {
        const workshopPlanningItems = await WorkshopPlanning.findAll({
          where: {
            id_welder: id_welder,
            priority: {
              [Op.gt]: workshopPlanning.priority,
              [Op.lte]: newPriority,
            },
          },
        });
        if (workshopPlanningItems.length > 0) {
          for (let i = 0; i < workshopPlanningItems.length; i++) {
            workshopPlanningItems[i].priority = workshopPlanningItems[i].priority - 1;
            await workshopPlanningItems[i].save();
          }
        }
        workshopPlanning.priority = newPriority;
        workshopPlanning.save();

        res.status(200).json({ message: "Planning mit à jour" });
        return;
      } else if (workshopPlanning.priority === newPriority) {
        res.status(409).json({ message: "La priorité est la même" });
        return;
      }
    } else {
      res.status(404).json({ message: "Cette tache n'a pas été plannifiée" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const setAchieved = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_workshop_planning, id_welder, priority } = req.body;
    const workshopPlanning = await WorkshopPlanning.findByPk(id_workshop_planning);
    const workshopPlanningItems = await WorkshopPlanning.findAll({
      where: {
        id_welder: id_welder,
        priority: {
          [Op.gt]: priority,
        },
      },
    });
    if (workshopPlanning) {
      workshopPlanning.priority = 0;
      workshopPlanning.achieved_at = new Date();
      workshopPlanning.save();
      if (workshopPlanningItems.length > 0) {
        for (let i = 0; i < workshopPlanningItems.length; i++) {
          workshopPlanningItems[i].priority = workshopPlanningItems[i].priority - 1;
          await workshopPlanningItems[i].save();
        }
      }
      //Modifier Statut
      res.status(200).json({ messge: "Tache achevée" });
    } else {
      res.status(404).json({ message: "Cette tache n'a pas été plannifiée" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const workshopPlannings = await WorkshopPlanning.findAll();
    if (workshopPlannings.length === 0) {
      res.status(404).json({ message: "Aucune Commande à ce jour" });
      return;
    }
    res.status(200).json({ workshopPlannings });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getOrderbyPk = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id_workshop_plannings } = req.body;
    const workshopPlanning = await WorkshopPlanning.findByPk(id_workshop_plannings);
    if (!workshopPlanning) {
      res.status(404).json({ message: "Commande inconnue" });
      return;
    }
    res.status(200).json({ workshopPlanning });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getByIdWelder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id_welder } = req.body;
    const workshopPlanningItems = await WorkshopPlanning.findAll({ where: { id_welder } });
    if (!workshopPlanningItems) {
      res.status(404).json({ message: "Aucun" });
      return;
    }
    res.status(200).json({ workshopPlanningItems });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
