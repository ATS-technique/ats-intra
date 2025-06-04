import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { StringifyOptions } from "querystring";

interface ArticleAttributes {
  id_article: number;
  title: string;
  visible: boolean;
  image: string;
  description: string;
}

interface ArticleCreationAttributes extends Optional<ArticleAttributes, "id_article" | "visible"> {}

class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
  public id_article!: number;
  public title!: string;
  public visible!: boolean;
  public image!: string;
  public description!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Article.init(
  {
    id_article: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "articles",
  },
);

export default Article;
