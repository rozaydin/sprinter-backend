import { APIGatewayProxyResult, APIGatewayEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import { User, UserImpl } from './model/User';
// import { firestore } from './service/Firestore';

export const createUser = async (_event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {

  // expecting new user to be valid User
  const _newUser = JSON.parse(_event.body);
  console.log("new user creation request received: " + _event.body);

  // valid user    
  const _user: User = <User>_newUser;
  // await firestore.collection("users").doc(_user.email).set(_user);

  return {
    statusCode: 200,
    body: JSON.stringify({
      result: "success",
      message: "User created"
    }, null, 2),
  };

}