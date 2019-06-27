import {getUserProfile} from '../helpers';
import appSyncClient from '../helpers/AppSyncClient';
import {readFromCache, CacheType} from '../сache';
import {UserProfile} from '../../../src/dynamodb_models';
import {deleteUserProfile} from '../helpers/user-profiles';

test('Query get user profile', async () => {
  const client = await appSyncClient();
  const {userId} = await readFromCache<UserProfile>(CacheType.userProfile);

  const userProfile = await getUserProfile(client, userId);

  expect(userProfile.userId).toEqual(userId);
  expect(userProfile.name).toBeDefined();
});

afterAll(async () => {
  const user = await readFromCache<UserProfile>(CacheType.userProfile);
  await deleteUserProfile(user.userId);
});
