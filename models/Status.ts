import { DataTypes } from "sequelize";
import db from "../db/connection";

const Status = db.define('status', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
  });

  export default Status;