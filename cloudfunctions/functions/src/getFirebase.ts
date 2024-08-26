import admin = require("firebase-admin");
import { SERVICE_ACCOUNT } from "./constants/firebaseServiceAccount";

// Initialize the Firebase Admin SDK with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT as admin.ServiceAccount),
});

// Initialize Firestore
const db = admin.firestore();
const auth = admin.auth();

// Export admin and db using ES6 module syntax
export { admin, db, auth };
