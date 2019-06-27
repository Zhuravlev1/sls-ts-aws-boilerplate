import {Context, Callback, Handler} from 'aws-lambda';

export const handle: Handler = async (
  event: Event,
  context: Context,
  cb: Callback
) => {
  cb(null, 'Processing DynamoDB event');
};
