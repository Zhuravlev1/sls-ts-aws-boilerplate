import * as _AWS from 'aws-sdk';
_AWS.config.update({region: 'us-east-1'});

import {handle as usersStreamHandler} from '../../../database/src/usersStreamHandler';
import {makeContext} from '../../helpers/LambdaHelper';

describe('User stream handler', () => {
  const context = makeContext();
  const cbMock = jest.fn();

  beforeEach(() => {
    jest.mock('../../../utils', () => ({
      getEnvironmentVariable: jest.fn().mockReturnValue('someEnvVar')
    }));
  });

  test('User stream handler should send successfully', async () => {
    const event = {};

    await usersStreamHandler(event, context, cbMock);

    expect(cbMock.mock.calls.length).toBe(1);
  });
});
