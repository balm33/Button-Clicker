const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

// firebase service account key
const serviceAccount = require("./button-clicker-3af86-firebase-adminsdk-fbsvc-a72d5fad4c.json");

// init firebase admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
const app = express();
const PORT = process.env.PORT || 8080;

// middleware to parse JSON requiests
app.use(express.json());

//middleware to connect backend to frontend
app.use(cors({ origin: true }));

// middleware to verify firebase token on protected routes
async function decodeToken(req, res, next) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({ error: "Unauthorized: No token provided!" });
  }

  const idToken = req.headers.authorization.split("Bearer")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // add decoded token to request
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

// public api route (server status)
app.get("/api/status", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// protected api route
// endpoint only accessible if FIrebase ID token is valid
app.get("/api/user_info", decodeToken, (req, res) => {
  res.status(200).json({
    message: "User info retrieved successfully!",
    uid: req.user.uid,
    email: req.user.email,
  });
});

// increment clicks
app.post("/click", async (req, res) => {
  const { uid } = req.body;
  const ref = db.collection("clicks").doc(uid);

  await db.runTransaction(async (t) => {
    const snap = await t.get(ref);
    const newCount = snap.exists ? snap.data().count + 1 : 1;
    t.set(ref, { count: newCount });
  });

  res.json({ success: true });
});

// get current clicks from database
app.get("/click/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const ref = db.collection("clicks").doc(uid);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.json({ count: 0 });
    }

    res.json({ count: doc.data().count });
  } catch (error) {
    console.error("Error fetching click count:", error);
    res.status(500).json({ error: "Failed to fetch click count" });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
