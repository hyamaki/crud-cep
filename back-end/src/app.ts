import "reflect-metadata";
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { registerDependencies } from './infrastructure/di/container';
import apiRoutes from './infrastructure/api/express/routes/api.route';
import dataSource from "./infrastructure/database/datasource";

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    registerDependencies(dataSource);
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
  });

const app : Express = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: [
    'http://localhost:3000',
  ]
}));

app.use(express.json());

app.use('/', apiRoutes);

export default app;
