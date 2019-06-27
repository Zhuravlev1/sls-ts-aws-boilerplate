declare module 'amazon-cognito-identity-js-node' {
  export interface AuthenticationDetailsData {
    Username: string;
    Password?: string;
  }

  export class AuthenticationDetails {
    constructor(data: AuthenticationDetailsData);
  }

  export interface CognitoUserPoolData {
    UserPoolId: string;
    ClientId: string;
    endpoint?: string;
  }

  // tslint:disable-next-line
  export class CognitoUserPool {
    constructor(data: CognitoUserPoolData);
  }

  export interface CognitoUserData {
    Username: string;
    Pool: CognitoUserPool;
  }

  // tslint:disable-next-line
  export class CognitoUser {
    constructor(data: CognitoUserData);
  }
}
