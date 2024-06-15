/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require('firebase-functions');
const fetch = require('node-fetch');
const cors = require('cors')({ origin: true });
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

exports.proxyRequest = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { path, ...params } = req.query;
    try {
      const response = await fetch(`https://fn-bellhop-agent-uat.azurewebsites.net${path}`, {
        method: req.method,
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9FUXRGY0Hg7O23lEAsQCeTUjP_47Zcyp=',
          'Content-Type': 'application/json'
        },
        body: req.method === 'GET' ? null : JSON.stringify(req.body)
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
