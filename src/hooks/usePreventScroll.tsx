'use client';

import { useEffect } from 'react';

const usePreventScroll = (isModalOpen: boolean) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return;
};

export default usePreventScroll;
