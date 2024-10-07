// components/TokenExpirationTimer.tsx
'use client';

import { TokenExpirationTimer } from '@/utils/TokenExpirationTimer';

interface GnbTokenExpirationTimerProps {
  token: string | undefined;
}

const GnbTokenExpirationTimer = ({ token }: GnbTokenExpirationTimerProps) => {
  const { timeLeft, isLoggedIn } = TokenExpirationTimer(token);

  if (!isLoggedIn) {
    return null;
  }

  return timeLeft > 0 ? (
    <p className='hidden text-14 font-semibold text-var-orange-50 md:block md:text-16'>
      남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
    </p>
  ) : null;
};

export default GnbTokenExpirationTimer;
