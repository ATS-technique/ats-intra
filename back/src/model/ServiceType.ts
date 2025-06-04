import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { NUMBER } from "sequelize";

interface ServiceTypeAttributes {
  id_service_type: number;
  name: string;
  coeff: number;
}

interface ServiceTypeCreationAttributes extends Optional<ServiceTypeAttributes, "id_service_type"> {}

class ServiceType extends Model<ServiceTypeAttributes> implements ServiceTypeAttributes {
  public id_service_type!: number;
  public name!: string;
  public coeff!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ServiceType.init(
  {
    id_service_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coeff: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "service_types",
  },
);

export default ServiceType;
