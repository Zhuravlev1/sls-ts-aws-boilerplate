import {APIGatewayEvent, Context, Callback, Handler} from 'aws-lambda';
import {getEnvironmentVariable} from '../utils';

export const status: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  const region = getEnvironmentVariable('REGION');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      AWS_REGION: region,
      message: 'Go Serverless!',
      input: event
    })
  };

  cb(null, response);
};
