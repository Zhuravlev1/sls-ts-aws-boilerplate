import gql from 'graphql-tag';
import {S3ImageUrl} from '../../../../utils';
import AWSAppSyncClient from 'aws-appsync/lib';

export interface UserInfo {
  name: string;
  about: string;
  city: string;
  street: string;
  profileImage: S3ImageUrl;
}

export async function createUserProfile(
  appSyncClient: AWSAppSyncClient<any>,
  userInfo: UserInfo
) {
  const mutation = gql`
    mutation createUserProfile(
      $name: String!
      $street: String!
      $city: String!
      $about: String!
      $profileImage: S3FileInput!
    ) {
      createUserProfile(
        name: $name
        street: $street
        city: $city
        about: $about
        profileImage: $profileImage
      ) {
        name
        city
        about
        street
        userId
        version
        createdAt
        updatedAt
        profileImage
      }
    }
  `;

  const result: any = await appSyncClient.mutate({
    mutation,
    fetchPolicy: 'no-cache',
    variables: {
      ...userInfo
    }
  });

  return result.data.createUserProfile;
}
