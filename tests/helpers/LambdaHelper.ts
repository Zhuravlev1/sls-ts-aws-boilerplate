import {Context} from 'aws-lambda';

export function makeContext(args?: any): Context {
  const context: Context = {
    callbackWaitsForEmptyEventLoop: true,
    functionName: 'functionName',
    functionVersion: 'functionVersion',
    invokedFunctionArn: 'invokedFunctionArn',
    memoryLimitInMB: 128,
    awsRequestId: 'awsRequestId',
    logGroupName: 'logGroupName',
    logStreamName: 'logStreamName',
    getRemainingTimeInMillis: () => 0,
    succeed: (messageOrObject: any) => messageOrObject,
    done: (error, result) => result,
    fail: error => error
  };

  Object.assign(context, args);

  return context;
}
