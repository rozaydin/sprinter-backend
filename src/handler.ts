import { APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

export const hello = async (_event:any, _context: any): Promise<APIGatewayProxyResult> => {

  

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello From Type Script!'
    }, null, 2),
  };
}