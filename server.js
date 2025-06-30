import express from "express";
import chalk from "chalk";
import userRouter from "./routers/user.router.js";
import { errorHandler } from "./utils/errorHandler.js";
import sequelize from "./db/index.js";
import "./models/User.js"; // wichtig: lädt Model für Sync
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ credentials: true }));
app.use(express.json());
app.use("/user", userRouter);
app.use(errorHandler);

// Sync DB und starte Server
sequelize
  .sync({ alter: true }) // erstellt Tabellen, passt Felder an
  .then(() => {
    console.log(chalk.green("Database synced"));
    app.listen(port, () =>
      console.log(chalk.bgGreen(`Server is running on port ${port}`))
    );
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
