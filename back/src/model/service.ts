import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ServiceAttributes {
  id_service: number;
  id_service_type: number;
  name: string;
  unit_cost: number;
  unit: string;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, "id_service"> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id_service!: number;
  public id_service_type!: number;
  public name!: string;
  public unit_cost!: number;
  public unit!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Service.init(
  {
    id_service: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_service_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "services",
  },
);

export default Service;
