import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import ProjectImage from "./projectImages";

export interface ProjectAttributes {
  id_project: number;
  id_project_type: number;
  name: string;
  description: string;
  cover_image: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id_project"> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id_project!: number;
  public id_project_type!: number;
  public name!: string;
  public description!: string;
  public cover_image!: string;

  public project_images!: ProjectImage[];
  public projectType!: string;
  
  public readonly created_at!: Date;    
  public readonly updated_at!: Date;
}

Project.init(
  {
    id_project: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_project_type: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "projects",
  },
);

export default Project;