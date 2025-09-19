import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ContactAttributes {
  id_contact: number;
  id_client: number;
  name: string;
  mail: string;
  landline: string;
  mobile: string;
}

interface DepositCreationAttributes
  extends Optional<ContactAttributes, "id_contact" | "mail" | "landline" | "mobile"> {}

class Contact extends Model<ContactAttributes, DepositCreationAttributes> implements ContactAttributes {
  public id_contact!: number;
  public id_client!: number;
  public name!: string;
  public mail!: string;
  public landline!: string;
  public mobile!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Contact.init(
  {
    id_contact: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    landline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "contacts",
  },
);

export default Contact;
