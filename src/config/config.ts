import dotenv from 'dotenv';

/**
 * Loads any environment variables we have in our batchrc file
 * inside our current environment or in our .env file in our root directory.
 *  */
dotenv.config();

// Using the "|| ''" to tell typescript it is a string and provide an empty string
//  if something goes wrong.
const MONGO_URL = process.env.MONGO_DB_CONNECTION || '';

const SERVER_PORT = process.env.PORT || 3009;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
