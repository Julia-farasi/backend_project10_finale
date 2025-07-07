import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Goals = sequelize.define("SparZiele", {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  target_amount: {
    type: DataTypes.INTEGER,
  },
  saved_amount: {
    type: DataTypes.INTEGER,
  },
  deadline: {
    type: DataTypes.DATE,
  },
});

export default Goals;
