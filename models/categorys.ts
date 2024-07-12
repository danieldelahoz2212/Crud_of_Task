import { DataTypes } from "sequelize";
import db from "../db/connection";

const Categorys = db.define('categorys',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});