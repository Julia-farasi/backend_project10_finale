import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URI, {
  logging: false, //logging: console.log, // für Debug, optional entfernen
});

export default sequelize;
