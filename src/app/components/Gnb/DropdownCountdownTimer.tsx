// components/TokenExpirationTimer.tsx
'use client';

import { TokenExpirationTimer } from '@/utils/TokenExpirationTimer';

interface DropdownCountdownTimerProps {
  token: string | undefined;
}

const DropdownCountdownTimer = ({ token }: DropdownCountdownTimerProps) => {
  const { timeLeft, isLoggedIn } = TokenExpirationTimer(token);

  if (!isLoggedIn) {
    return null;
  }

  return timeLeft > 0 ? (
    <p className='px-16 py-12 text-[12px] font-medium text-var-black hover:bg-var-orange-100 md:px-16'>
      {Math.floor(timeLeft / 60)} : {timeLeft % 60}
    </p>
  ) : null;
};

export default DropdownCountdownTimer;
