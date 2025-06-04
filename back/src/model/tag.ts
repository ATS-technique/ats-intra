import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { StringifyOptions } from "querystring";

interface TagAttributes {
  id_tag: number;
  name: string;
}

interface TagCreationAttributes {}

class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
  public id_tag!: number;
  public name!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Tag.init(
  {
    id_tag: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tags",
  },
);

export default Tag;
