import {makeContext} from '../helpers/LambdaHelper';
import {status} from '../../src/handler';

jest.mock('../../utils', () => ({
  getEnvironmentVariable: jest.fn().mockReturnValue('someEnvVar')
}));

test('configuration handler should work correctly', async () => {
  const cbMock = jest.fn();
  await status({}, makeContext(), cbMock);

  expect(cbMock.mock.calls.length).toBe(1);
  expect(cbMock.mock.calls[0][1].statusCode).toBe(200);
  expect(cbMock.mock.calls[0][1].body).toBeDefined();
});
