import admin from 'firebase-admin';
require("dotenv").config();

const serviceAccount: admin.ServiceAccount = {
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error:any) {
    console.log('Firebase Admin Initialization Error', error?.stack);
  }
}
export default admin.firestore();