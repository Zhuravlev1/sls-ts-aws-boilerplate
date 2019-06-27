import {getEnvironmentVariable} from '../../utils';

test('getEnvironmentVariable should throw error', () => {
  expect(() => getEnvironmentVariable('myString')).toThrow(
    'Environment variable myString is undefined'
  );
});

test('getEnvironmentVariable should return expected value', () => {
  process.env.myKey = 'myValue';
  expect(getEnvironmentVariable('myKey')).toBe('myValue');
});
