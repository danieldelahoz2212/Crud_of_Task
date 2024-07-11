import { DataTypes } from "sequelize";
import db from "../db/connection";

const Rols = db.define('rols', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    rol:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
  });

  export default Rols;