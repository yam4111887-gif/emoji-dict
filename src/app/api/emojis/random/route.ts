import { NextResponse } from 'next/server';
import { emojis } from '@/data/emojis';

export const dynamic = 'force-dynamic';

export async function GET() {
  const random = emojis[Math.floor(Math.random() * emojis.length)];
  return NextResponse.json(random);
}
