import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface OrderAttributes {
  id_order: number;
  id_client: number;
  site_name: string;
  ordered_at: Date;
  validated: boolean;
  id_deposit: number;
  site_address: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id_order" | "validated"> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id_order!: number;
  public id_client!: number;
  public site_name!: string;
  public ordered_at!: Date;
  public validated!: boolean;
  public id_deposit!: number;
  public site_address!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_client: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    site_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ordered_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    id_deposit: {
      type: DataTypes.NUMBER,
      defaultValue: true,
    },
    site_address: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "order_details",
  },
);

export default Order;
