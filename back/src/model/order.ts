import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface OrderAttributes {
  id_order: number;
  id_client: number;
  quote_number: number;
  site_name: string;
  ordered_at: Date;
  price: number;
  comment: string;
  object: string;
  deposit_paid: boolean;
  deposit_rate: number;
  id_contact: number;
  validated: boolean;
  paid: boolean;
  billed: boolean;
  billing_date: Date;
  payement_date: Date;
  site_address: string;
  reference: string;
  id_user: number;
}

interface OrderCreationAttributes
  extends Optional<
    OrderAttributes,
    | "id_order"
    | "validated"
    | "reference"
    | "price"
    | "deposit_paid"
    | "paid"
    | "billed"
    | "billing_date"
    | "payement_date"
  > {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id_order!: number;
  public id_client!: number;
  public quote_number!: number;
  public site_name!: string;
  public ordered_at!: Date;
  public price!: number;
  public comment!: string;
  public object!: string;
  public validated!: boolean;
  public paid!: boolean;
  public payement_date!: Date;
  public billed!: boolean;
  public billing_date!: Date;
  public id_contact!: number;
  public deposit_rate!: number;
  public deposit_paid!: boolean;
  public site_address!: string;
  public reference!: string;
  public id_user!: number;
  public client_name!: string;
  public user_name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quote_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    site_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    ordered_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    object: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    billed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    billing_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    payement_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    id_contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    deposit_rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    deposit_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    site_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_details",
  },
);

export default Order;
