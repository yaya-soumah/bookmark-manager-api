export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  collectCoverageFrom: ['<rootDir>/components/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  clearMocks: true,
  coverageReporters: ['text', 'html'],
}
