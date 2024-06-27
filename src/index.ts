import express from "express";
import authRouter from "./routes/authRouter";
import AppDataSource from "./data-source";

const app = express();
const port = process.env.PORT || 8000;

// 데이터베이스 연결
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use(authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
