'use server';

import { cookies } from 'next/headers';

export const getCookie = async (key: string) => {
  const cookie = cookies().get(key);
  return cookie?.value;
};

export const setCookie = async (key: string, value: string) => {
  cookies().set(key, value);
};

// 쿠키를 삭제하는 함수
export const deleteCookie = async (key: string) => {
  cookies().delete(key);
};
