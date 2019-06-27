import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import DeleteItemInput = DocumentClient.DeleteItemInput;
import {getEnvironmentVariable} from '../../../../utils';

export async function deleteUserProfile(userId: string) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const userProfileTableName = getEnvironmentVariable('USER_PROFILES_TABLE');
  const request: DeleteItemInput = {
    TableName: userProfileTableName,
    Key: {
      userId
    }
  };

  return dynamoDb.delete(request).promise();
}
