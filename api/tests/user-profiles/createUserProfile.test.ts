import * as faker from 'faker';
import {writeToCache, CacheType} from '../сache';
import appSyncClient from '../helpers/AppSyncClient';
import {createUserProfile} from '../helpers/user-profiles';
import {UserInfo} from '../helpers/user-profiles/createUserProfileHelper';

test('mutation createUserProfile', async () => {
  const client = await appSyncClient();

  const userInfo: UserInfo = {
    name: faker.name.firstName(),
    city: faker.address.city(),
    about: faker.lorem.paragraphs(),
    street: faker.address.streetAddress(),
    profileImage: {
      key: 'key',
      bucket: 'bucket',
      region: 'region'
    }
  };

  const userProfile = await createUserProfile(client, userInfo);
  await writeToCache(CacheType.userProfile, userProfile);

  expect(userProfile.userId).toBeDefined();
  expect(userProfile.version).toBe(1);
  expect(userProfile.name).toBe(userInfo.name);
  expect(userProfile.street).toBe(userInfo.street);
});
