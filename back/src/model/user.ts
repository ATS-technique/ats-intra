import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface UserAttributes {
  id_user: number;
  name: string;
  mail: string;
  password: string;
  is_active: boolean;
  is_dark : boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id_user" | "is_active" | "is_dark"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_user!: number;
  public name!: string;
  public mail!: string;
  public password!: string;
  public is_active!: boolean;
  public is_dark!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_dark: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
  },
);

export default User;
