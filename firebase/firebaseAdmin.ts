import * as firebaseAdmin from "firebase-admin";
import serviceAccount from "@firebase/secrets.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    }),
  });
}

export { firebaseAdmin };
