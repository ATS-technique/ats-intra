import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ProductAttributes {
  id_product: number;
  id_order: number;
  designation: string;
  quantity: number;
  id_status: string;
  unit: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id_product" | "id_status"> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id_product!: number;
  public id_order!: number;
  public designation!: string;
  public quantity!: number;
  public id_status!: string;
  public unit!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Product.init(
  {
    id_product: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_order: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    id_status: {
      type: DataTypes.NUMBER,
      defaultValue: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  },
);

export default Product;
