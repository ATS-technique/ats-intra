import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { StringifyOptions } from "querystring";

interface PressMentionAttributes {
  id_press_mention: number;
  media_name: string;
  article_name: string;
  article_url: string;
  description: string;
  date: string;
  link_text: string;
  image_path: string;
}

interface PressMentionCreationAttributes
  extends Optional<PressMentionAttributes, "id_press_mention" | "date" | "description" | "article_name"> {}

class PressMention
  extends Model<PressMentionAttributes, PressMentionCreationAttributes>
  implements PressMentionAttributes
{
  public id_press_mention!: number;
  public media_name!: string;
  public article_name!: string;
  public article_url!: string;
  public description!: string;
  public date!: string;
  public link_text!: string;
  public image_path!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

PressMention.init(
  {
    id_press_mention: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    media_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "press_mentions",
  },
);

export default PressMention;
