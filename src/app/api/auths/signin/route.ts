import { setCookie } from '@/actions/auth/cookie/cookie';
import { NextResponse } from 'next/server';

export interface LoginResponse {
  token: string;
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    // API 응답 상태 확인
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || '로그인 실패' },
        { status: response.status },
      );
    }

    const { token }: LoginResponse = await response.json();
    await setCookie('token', token);

    return NextResponse.json({ message: '로그인 성공' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '로그인 실패' }, { status: 500 });
  }
};
