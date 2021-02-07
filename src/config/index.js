const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  botToken: process.env.BOT_TOKEN,
  devBotToken: process.env.DEV_BOT_TOKEN,
  port: process.env.PORT,
  url: process.env.URL,
};
