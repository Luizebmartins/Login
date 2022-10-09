import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase_dev.json';

const firebaseAdmin = admin.initializeApp({
   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export {firebaseAdmin}