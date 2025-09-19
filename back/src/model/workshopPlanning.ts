import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface WorkshopPlanningAttributes {
  id_workshop_planning: number;
  id_product: number;
  id_welder: number;
  priority: number;
  progress: number;
  achieved_at: Date;
}

interface WorkshopPlanningCreationAttributes
  extends Optional<WorkshopPlanningAttributes, "id_workshop_planning" | "progress" | "achieved_at"> {}

class WorkshopPlanning
  extends Model<WorkshopPlanningAttributes, WorkshopPlanningCreationAttributes>
  implements WorkshopPlanningAttributes
{
  public id_workshop_planning!: number;
  public id_product!: number;
  public id_welder!: number;
  public priority!: number;
  public progress!: number;
  public achieved_at!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

WorkshopPlanning.init(
  {
    id_workshop_planning: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_welder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    achieved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "workshop_planning",
  },
);

export default WorkshopPlanning;
