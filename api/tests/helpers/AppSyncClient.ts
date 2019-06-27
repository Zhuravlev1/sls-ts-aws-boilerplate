import fetch from 'node-fetch';
import {matchers} from 'jest-json-schema';
import * as dotenv from 'dotenv';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import {getEnvironmentVariable} from '../../../utils';
import {RequestInit, Request, Response} from 'node-fetch';
import {AUTH_TYPE, AWSAppSyncClient} from 'aws-appsync';
interface Global extends NodeJS.Global {
  fetch(url: string | Request, init?: RequestInit): Promise<Response>;
}

(global as Global).fetch = fetch;
dotenv.config();
expect.extend(matchers);

const poolData = {
  UserPoolId: getEnvironmentVariable('COGNITO_USER_POOL_ID'),
  ClientId: getEnvironmentVariable('COGNITO_CLIENT_ID')
};
const userPool = new CognitoUserPool(poolData);

async function getJWT(userName: string, userPassword: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: userPassword
    });
    getCognitoUser(userName).authenticateUser(authenticationDetails, {
      onSuccess: result => {
        resolve(result.getAccessToken().getJwtToken());
      },
      onFailure: err => {
        reject(err);
      }
    });
  });
}

async function getAppSyncClient(userName?: string, userPassword?: string) {
  if (!userName) {
    userName = getEnvironmentVariable('COGNITO_USERNAME');
  }
  if (!userPassword) {
    userPassword = getEnvironmentVariable('COGNITO_PASSWORD');
  }
  const token = await getJWT(userName, userPassword);
  return new AWSAppSyncClient({
    url: getEnvironmentVariable('GRAPHQL_ENDPOINT'),
    region: getEnvironmentVariable('AWS_REGION'),
    auth: {
      type: getEnvironmentVariable('COGNITO_AUTHENTICATION_TYPE') as AUTH_TYPE,
      jwtToken: token
    },
    disableOffline: true
  });
}

function getCognitoUser(userName: string) {
  const userParams = {
    Pool: userPool,
    Username: userName
  };

  return new CognitoUser(userParams);
}

export default getAppSyncClient;
