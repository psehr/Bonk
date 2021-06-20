var admin = require("firebase-admin");
var firebase = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(firebase)
});

const db = admin.firestore();

module.exports = db;