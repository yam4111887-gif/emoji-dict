import { NextRequest, NextResponse } from 'next/server';
import { emojis } from '@/data/emojis';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ codepoint: string }> }
) {
  const { codepoint } = await params;
  
  const emoji = emojis.find(e => e.codepoint === codepoint);
  
  if (!emoji) {
    return NextResponse.json(
      { error: 'Emoji not found', codepoint },
      { status: 404 }
    );
  }

  return NextResponse.json(emoji);
}
