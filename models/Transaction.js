// models/Transaction.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js"; // passe ggf. den Pfad an

const Transaction = sequelize.define("Transaction", {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  is_expense: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Transaction;
