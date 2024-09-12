module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // React 환경에서 테스트할 경우 jsdom 사용
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // TypeScript 파일을 ts-jest로 변환
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
