import { ChangeEvent } from 'react';

interface OnChangeProfileImageProps {
  setProfileImage: React.Dispatch<React.SetStateAction<File | string>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const onChangeProfileImage =
  ({ setProfileImage, setImagePreview }: OnChangeProfileImageProps) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // 이미지 미리보기 설정
      };
      reader.readAsDataURL(file); // 파일을 읽어서 Data URL 생성
    }
  };

export default onChangeProfileImage;
