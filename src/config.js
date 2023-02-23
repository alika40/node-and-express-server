require("dotenv").config();


const config = {
    app: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
    }
   };


module.exports = config;
