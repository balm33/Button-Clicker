const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// firebase service account key
const serviceAccount = require("./button-clicker-3af86-firebase-adminsdk-fbsvc-a72d5fad4c.json");

// init firebase admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 8080;

// middleware to parse JSON requiests
app.use(express.json());

//middleware to connect backend to frontend
app.use(cors({ origin: true }));
