import { Sequelize, Dialect } from "sequelize";
import "dotenv/config";

const dialect = process.env.DB_DIALECT as Dialect;

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: dialect,
    logging: false,
  }
);
