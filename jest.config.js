module.exports = {
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1',
    '^@entities(.*)$': '<rootDir>/src/entities$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@modules(.*)$': '<rootDir>/src/modules$1',
    '^@mocks(.*)$': '<rootDir>/test/mocks$1',
    '^@repositories(.*)$': '<rootDir>/src/repositories$1'
  },
  transformIgnorePatterns: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
