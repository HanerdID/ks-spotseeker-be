import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js"; // Tambahkan baris ini
import db from "./config/Database.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

// (async () => {
//   await db.sync();
// })();

// db.sync({
//     force: true,
//     alter: true
// }).then(() => {
//     console.log('Database connected');
// }).catch((err) => {
//     console.log(err);
// });
