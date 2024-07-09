import { DataTypes } from "sequelize";
import db from "../db/connection";

const Users = db.define('users', {
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    rol: {
      type: DataTypes.INTEGER,
    },
    estate: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false
  });

export default Users;