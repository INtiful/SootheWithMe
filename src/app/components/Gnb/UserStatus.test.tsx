// UserStatus.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserStatus from './UserStatus';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

const mockUser = {
  name: '홍길동',
  company: '테스트 회사',
  email: 'test@example.com',
  image: 'path/to/profile.jpg',
};
// 이미지 컴포넌트 모킹
jest.mock('@/public/images', () => ({
  Profile: () => <div data-testid='profile' />,
}));

// 'next/navigation' 모듈에서 usePathname 훅을 모킹
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// 'next/router' 모듈에서 useRouter 훅을 모킹
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('UserStatus 컴포넌트', () => {
  const push = jest.fn();
  beforeEach(() => {
    // pathname 모킹
    (usePathname as jest.Mock).mockReturnValue('/');
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it('로그인 상태가 아닐 때 로그인 링크를 보여준다.', () => {
    render(<UserStatus user={null} />);

    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('사용자 프로필 이미지가 있을 때 이미지를 보여준다.', () => {
    render(<UserStatus user={mockUser} />);

    const profileImage = screen.getByAltText('프로필이미지');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', mockUser.image);
  });

  it('사용자 프로필 이미지가 없을 때 기본 프로필 아이콘을 보여준다.', () => {
    const userWithoutImage = { ...mockUser, image: '' };
    render(<UserStatus user={userWithoutImage} />);

    // 기본 프로필 아이콘이 보여지는지 확인
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

  it('프로필 이미지 클릭 시 드롭다운 메뉴를 보여준다.', () => {
    render(<UserStatus user={mockUser} />);
    const profileImage = screen.getByAltText('프로필이미지');
    fireEvent.click(profileImage);

    // 드롭다운이 렌더링된 후 기대를 확인합니다.
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('마이페이지')).toBeInTheDocument();
    expect(screen.getByText('로그아웃')).toBeInTheDocument();
  });

  it('드롭다운 메뉴 외부 클릭 시 드롭다운이 닫힌다.', async () => {
    render(<UserStatus user={mockUser} />);

    const profileImage = screen.getByAltText('프로필이미지');
    fireEvent.click(profileImage);
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  /* 탭을 클릭하면 링크로 이동된다. */
  it('navigates to the correct link when a tab is clicked', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<UserStatus user={mockUser} />);

    const profileImage = screen.getByAltText('프로필이미지');
    fireEvent.click(profileImage);

    // '마이페이지' 탭 클릭
    fireEvent.click(screen.getByText('마이페이지'));
    expect(push).toHaveBeenCalledWith('/mypage');

    // // '로그아웃' 탭 클릭
    // fireEvent.click(screen.getByText('로그아웃'));
    // expect(push).toHaveBeenCalledWith('/');
  });
});
