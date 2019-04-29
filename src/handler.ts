import { APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import * as admin from 'firebase-admin';

export const hello = async (_event: any, _context: any): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello From Type Script!'
    }, null, 2),
  };
}

export function initFireStore() {

  // service account 
  const serviceAccount = require("./config/credentials/sprinter-bcb0c-firebase-adminsdk-9s8qj-5ed6bc5be9.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sprinter-bcb0c.firebaseio.com"
  });

  // get a db reference
  return admin.firestore();
}