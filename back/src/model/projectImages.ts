import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ProjectImageAttributes {
  id_project_image: number;
  id_project: number;
  path: string;
}

interface ProjectImageCreationAttributes extends Optional<ProjectImageAttributes, "id_project_image"> {}

class ProjectImages extends Model<ProjectImageAttributes, ProjectImageCreationAttributes> implements ProjectImageAttributes {
  public id_project_image!: number;
  public id_project!: number;
  public path!: string;

  public readonly created_at!: Date;    
  public readonly updated_at!: Date;
}

ProjectImages.init(
  {
    id_project_image: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_project: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "project_images",
  },
);

export default ProjectImages;