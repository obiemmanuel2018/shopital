const functions = require('firebase-functions');
const cors = require("cors")({ origin: true });

exports.helloWorld = functions.https.onRequest((request: any, response: any) => {
    cors(request, response, () => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send({text:"Hello from Firebase!"});
        
    });
});