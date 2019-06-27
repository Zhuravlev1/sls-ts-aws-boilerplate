module.exports = {
  preset: 'ts-jest',
  testRegex: '.*.test.ts$',
  rootDir: './api/tests',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transformIgnorePatterns: [],
  testSequencer: '<rootDir>/helpers/sortSequencer.js',
  verbose: true
};
