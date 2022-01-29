require('dotenv').config();

export const GLOBAL_VARIABLES = {
  KAFKA_ENDPOINT: process.env.KAFKA_ENDPOINT || '',
};
