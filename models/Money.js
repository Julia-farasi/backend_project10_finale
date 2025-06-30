import { Sequelize } from "sequelize";

const Money = Sequelize.afterDefine("Money", {
  expense: {
    type: DataTypes.BOOLEAN,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  category: {
    type: DataTypes.VARCHAR,
  },
});

export default Money;
