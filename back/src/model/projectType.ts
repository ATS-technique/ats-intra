import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ProjectTypeAttributes {
  id_project_type: number;
  name: string;
}

interface ProjectTypeCreationAttributes extends Optional<ProjectTypeAttributes, "id_project_type"> {}

class ProjectType extends Model<ProjectTypeAttributes, ProjectTypeCreationAttributes> implements ProjectTypeAttributes {
  public id_project_type!: number;
  public name!: string;

  public readonly created_at!: Date;    
  public readonly updated_at!: Date;
}

ProjectType.init(
  {
    id_project_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "project_types",
  },
);

export default ProjectType;