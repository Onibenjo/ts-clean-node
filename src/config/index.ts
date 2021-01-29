import { config } from 'dotenv';

config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  mongo: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PWD,
  },
  pg: {
    HOST: process.env.PG_HOST,
    USER: process.env.PG_USER,
    DATABASE: process.env.PG_DATABASE,
    PASSWORD: process.env.PG_PASSWORD,
    PORT: process.env.PG_PORT,
  },
};
