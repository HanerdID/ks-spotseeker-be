/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/Database.js';
import Route from './routes/Routes.js';

dotenv.config();

const app = express();

// (async () => {
//     await db.sync();
// })();

// db.sync({
//     force: true,
//     alter: true
// }).then(() => {
//     console.log('Database connected');
// }).catch((err) => {
//     console.log(err);
// });

app.use(
  cors({
    credential: true,
    origin: 'http://localhost:9898',
  }),
);

app.use(express.json());
app.use(Route);
app.use('/uploads', express.static('uploads'));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
