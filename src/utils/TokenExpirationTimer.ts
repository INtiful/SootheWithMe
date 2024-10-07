import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { postUserLogoutData } from '@/app/api/actions/mypage/postUserLogoutData';
import toast from 'react-hot-toast';
import { deleteCookie } from '@/actions/auth/cookie/cookie';
import { EXPIRY_TIME } from '@/constants/common';

export const TokenExpirationTimer = (token: string | undefined) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(EXPIRY_TIME / 1000); // 남은 시간 초기값
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 상태 관리

  // 로컬 스토리지에서 남은 시간을 불러오는 함수
  const loadRemainingTime = () => {
    const storedTimeLeft = localStorage.getItem('timeLeft');
    if (storedTimeLeft) {
      setTimeLeft(parseInt(storedTimeLeft, 10));
    } else {
      const expirationTime = Date.now() + EXPIRY_TIME;
      const remainingTime = Math.max(
        0,
        Math.floor((expirationTime - Date.now()) / 1000),
      );
      setTimeLeft(remainingTime); // 초기값을 남은 시간으로 설정
      localStorage.setItem('timeLeft', remainingTime.toString()); // 남은 시간 저장
    }
  };

  // 타이머를 설정하는 함수
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          logout();
          localStorage.removeItem('timeLeft'); // 시간 초기화
          return 0;
        }
        const newTimeLeft = prev - 1;
        localStorage.setItem('timeLeft', newTimeLeft.toString()); // 남은 시간 저장
        return newTimeLeft;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      loadRemainingTime(); // 남은 시간 불러오기

      const cleanupTimer = startTimer();

      return cleanupTimer; // 클린업 함수 반환
    } else {
      setIsLoggedIn(false);
      logout();
    }
  }, [token]);

  const logout = async () => {
    const result = await postUserLogoutData();

    if (result) {
      toast.error('토큰이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.removeItem('timeLeft');
      deleteCookie('token');
      return router.push('/gatherings');
    } else {
      toast.error('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return { timeLeft, isLoggedIn };
};
