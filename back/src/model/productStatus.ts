import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ProductAttributes {
  id_product_status: number;
  name: string;
}


class ProductStatus extends Model<ProductAttributes> implements ProductAttributes {
  public id_product_status!: number;
  public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductStatus.init(
  {
    id_product_status: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    sequelize,
    tableName: "product_status",
  },
);

export default ProductStatus;
