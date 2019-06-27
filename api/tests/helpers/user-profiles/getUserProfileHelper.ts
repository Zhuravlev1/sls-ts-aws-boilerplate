import AWSAppSyncClient from 'aws-appsync';
import gql from 'graphql-tag';

export async function getUserProfile(
  appSyncClient: AWSAppSyncClient<any>,
  userId: string
) {
  const query = gql`
    query getUserProfile($userId: ID!) {
      getUserProfile(userId: $userId) {
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

  const result: any = await appSyncClient.query({
    query,
    fetchPolicy: 'network-only',
    variables: {
      userId
    }
  });

  return result.data.getUserProfile;
}
