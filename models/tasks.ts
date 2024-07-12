import { DataTypes } from "sequelize";
import db from "../db/connection";

const Tasks = db.define('tasks',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idUser:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: true
    }
},{
    timestamps: false
});

export default Tasks;