import { ChangeEvent } from 'react';
import onChangeProfileImage from './onChangeProfileImage';

describe('onChangeProfileImage', () => {
  let setProfileImage: jest.Mock;
  let setImagePreview: jest.Mock;

  beforeEach(() => {
    setProfileImage = jest.fn();
    setImagePreview = jest.fn();
  });

  // 파일이 선택되었을 때 올바른 인자와 함께 setProfileImage와 setImagePreview가 호출되는지 테스트
  it('should call setProfileImage and setImagePreview with the correct values', async () => {
    const mockFile = new File([''], 'test-image.png', { type: 'image/png' });
    const fileChangeEvent = {
      target: {
        files: {
          0: mockFile,
          length: 1,
          item: (index: number) => (index === 0 ? mockFile : null),
          [Symbol.iterator]: function* () {
            yield mockFile;
          },
        } as FileList,
      },
    } as ChangeEvent<HTMLInputElement>;

    const handleChange = onChangeProfileImage({
      setProfileImage,
      setImagePreview,
    });
    handleChange(fileChangeEvent); // 함수 호출

    // 비동기 코드가 실행되기를 기다림
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(setProfileImage).toHaveBeenCalledWith(mockFile); // setProfileImage가 올바른 인자와 함께 호출되었는지 확인
    expect(setImagePreview).toHaveBeenCalled(); // setImagePreview가 호출되었는지 확인
  });

  // 파일이 선택되지 않았을 때 setProfileImage와 setImagePreview가 호출되지 않아야 하는지 테스트
  it('should not call setProfileImage or setImagePreview when no file is selected', () => {
    const fileChangeEvent = {
      target: {
        files: {
          length: 0,
          item: jest.fn(),
          [Symbol.iterator]: function* () {},
        } as FileList,
      },
    } as ChangeEvent<HTMLInputElement>;

    const handleChange = onChangeProfileImage({
      setProfileImage,
      setImagePreview,
    });
    handleChange(fileChangeEvent); // 함수 호출

    expect(setProfileImage).not.toHaveBeenCalled(); // setProfileImage가 호출되지 않았는지 확인
    expect(setImagePreview).not.toHaveBeenCalled(); // setImagePreview가 호출되지 않았는지 확인
  });
});
