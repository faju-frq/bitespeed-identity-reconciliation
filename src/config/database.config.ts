import { Sequelize, Dialect } from "sequelize";
import "dotenv/config";

const dialect = process.env.DB_DIALECT as Dialect;

export const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorised: false,
    },
  },
});
