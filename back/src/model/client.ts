import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { StringifyOptions } from "querystring";

interface ClientAttributes {
  id_client: number;
  name: string;
  pro: boolean;
  tel: string;
  mail: number;
  address: string;
  post_code: number;
  city: string;
  siren: string;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "id_client" | "siren"> {}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  public id_client!: number;
  public name!: string;
  public pro!: boolean;
  public tel!: string;
  public mail!: number;
  public address!: string;
  public post_code!: number;
  public city!: string;
  public siren!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Client.init(
  {
    id_client: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pro: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    post_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    siren: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clients",
  },
);

export default Client;
