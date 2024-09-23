import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const data = await req.json();

  return NextResponse.json({ message: '로그인 성공' }, { status: 201 });
};
