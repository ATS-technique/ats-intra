import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { StringifyOptions } from "querystring";

interface ArticlesTagsAttributes {
  id_article: number;
  id_tag: number;
}

interface ArticleCreationAttributes {}

class ArticleTags extends Model<ArticlesTagsAttributes, ArticleCreationAttributes> implements ArticlesTagsAttributes {
  public id_article!: number;
  public id_tag!: number;
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ArticleTags.init(
  {
    id_article: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_tag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "articles_tags",
  },
);

export default ArticleTags;
