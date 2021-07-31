const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getAdminAdress = functions.https.onRequest((request, response) => {
  const config = functions.config();
  if (config.admin && config.admin.adress) {
    res.send(config.admin.adress);
  }
  else {
    res.send("");
  }
});
