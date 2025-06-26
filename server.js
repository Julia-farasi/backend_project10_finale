import express from "express";
import chalk from "chalk";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// app.use("/users", userRouter);

// app.use(errorHandler);

app.listen(port, () =>
  console.log(chalk.bgGreen(`Server is running on port ${port}`))
);
