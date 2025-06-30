import { Sequelize } from "sequelize";

const Goals = Sequelize.afterDefine("Money", {
  title: {
    type: DataTypes.VARCHAR,
  },
  target_amount: {
    type: DataTypes.INTEGER,
  },
  savec_amount: {
    type: DataTypes.INTEGER,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
  },
});

export default Goals;
