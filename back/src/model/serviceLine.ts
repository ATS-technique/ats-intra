import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { NUMBER } from "sequelize";

interface ServiceLineAttributes {
    id_service_line: number;
    id_product: number;
    id_service: number;
    quantity: number;
}

interface ServiceLineCreationAttributes extends Optional<ServiceLineAttributes, "id_service_line"> {}

class ServiceLine extends Model<ServiceLineAttributes, ServiceLineCreationAttributes> implements ServiceLineAttributes {
    public id_service_line!: number;
    public id_product!: number;
    public id_service!: number;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ServiceLine.init(
    {
        id_service_line: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        id_product: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        id_service: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "service_lines",
    },
);

export default ServiceLine;
