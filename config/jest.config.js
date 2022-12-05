module.exports = {
  displayName: 'unit',
  rootDir: '../',
  moduleNameMapper: {
    '\\.svg': '<rootDir>/test/mock/svg-mock.tsx',
    'pages/(.*)': ['<rootDir>/pages/$1'],
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '~/(.*)': ['<rootDir>/$1']
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '\\.e2e.test.(js|jsx|ts|tsx)$'
  ],
  transformIgnorePatterns: [
    `/node_modules/(?!@toptal|@sindresorhus|escape-string-regexp)`
  ],
  transform: {
    '^.+\\.(t|j)(s|sx)?$': ['@swc/jest']
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        filename: 'jest-report-unit.html',
        publicPath: './reports'
      }
    ]
  ],
  coverageDirectory: 'test-coverage/unit',
  collectCoverageFrom: [
    'components/**/*.(js|jsx|ts|tsx)',
    'lib/**/*.(js|jsx|ts|tsx)',
    '!lib/constants/*.(js|jsx|ts|tsx)',
    '!lib/types/*.(js|jsx|ts|tsx)',
    '!lib/utils/*.(js|jsx|ts|tsx)'
  ]
}
