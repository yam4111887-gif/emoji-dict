import { NextRequest, NextResponse } from 'next/server';
import { emojis } from '@/data/emojis';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  let results = [...emojis];

  // Filter by category
  if (category) {
    results = results.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.keywords.some(k => k.toLowerCase().includes(q)) ||
      e.description.toLowerCase().includes(q)
    );
  }

  const total = results.length;

  // Pagination
  const paginated = results.slice(offset, offset + limit);

  return NextResponse.json({
    total,
    count: paginated.length,
    offset,
    limit,
    data: paginated,
  });
}
