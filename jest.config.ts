module.exports = {
  testEnvironment: 'jsdom', // Jest가 테스트를 실행할 환경을 설정
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Jest가 테스트 실행 전에 실행할 파일을 지정
};
