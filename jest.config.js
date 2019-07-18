module.exports = {
  preset: 'ts-jest',
  testRegex: 'tests/.*.spec.ts$',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    'utils/**/*.{js,ts}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  modulePathIgnorePatterns: ['api'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testEnvironment: 'node',
  transformIgnorePatterns: []
};
