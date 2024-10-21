import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface DepositAttributes {
  id_deposit: number;
  rate: number;
  paid: boolean;
  amount: number;
}

interface DepositCreationAttributes extends Optional<DepositAttributes, "id_deposit" | "paid" | "amount" > {}

class Deposit extends Model<DepositAttributes, DepositCreationAttributes> implements DepositAttributes {
    public id_deposit!: number;
    public rate!: number;
    public paid!: boolean;
    public amount!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Deposit.init(
  {
    id_deposit: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    rate: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    amount: {
        type: DataTypes.NUMBER,
        allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "deposits",
  },
);

export default Deposit;
