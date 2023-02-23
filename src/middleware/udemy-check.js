const axios = require('axios');

const config = require('../config');


const { app: { CLIENT_ID, CLIENT_SECRET } } = config;


const authHeaderValue = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');


module.exports =  axios.create({
            baseURL: "https://www.udemy.com/api-2.0/",
            headers: {
                        'content-type': 'text/html; charset=UTF-8',
                        'Authorization': authHeaderValue
                 },
            responseType: 'json',
            
});
