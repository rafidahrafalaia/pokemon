const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * App Configuration
   */
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.PORT, 10),
    front_url: process.env.FRONT_ENDPOINT,
  },



  /**
   * MariaDB Configuration
   */
   mariaDB: {
      username: process.env.MARIA_USERNAME,
      password: process.env.MARIA_PASSWORD,
      database: process.env.MARIA_DATABASE,
      host: process.env.MARIA_HOST,
      dialect: process.env.MARIA_DIALECT,
      logging: process.env.MARIA_LOGGING == "console" ? console.log : false,
      dialectOptions: {
        timezone: process.env.MARIA_TIMEZONE,
        connectTimeout: 60000,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 120000,
        idle: 120000,
        evict: 120000,
      },
  },

  /**
   * Used by winston logger
   */
   logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

};
