const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  rootDir: './',
  moduleNameMapper: {
    '^@/public/(.*)$': '<rootDir>/public/$1', // public 폴더 매핑
    '^@/(.*)$': '<rootDir>/src/$1', // src 폴더 매핑
  },
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '<rootDir>/src/utils/**/*.test.tsx',
    '<rootDir>/src/utils/**/*.test.ts',
    '<rootDir>/src/app/components/**/*.test.tsx',
    '<rootDir>/src/app/components/**/*.test.ts',
  ],
  testPathIgnorePatterns: ['^src/app/.*/page.(test|spec).(ts|tsx)$'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
