import express from "express";
import router from "./routes/testRouter";

const app = express();
const port = process.env.PORT || 8000;

app.use(router);

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
