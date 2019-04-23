module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  testMatch: ['**/test/**/*.test.(ts|tsx)?(x)'],
  automock: false,
  setupFiles: [
    "./setupJest.ts"
  ]
};
