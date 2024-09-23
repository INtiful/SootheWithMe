import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const data = await req.json();

  return NextResponse.json({ message: '사용자 생성 성공' }, { status: 201 });
};
