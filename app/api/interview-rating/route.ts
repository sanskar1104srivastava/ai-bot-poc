import { NextResponse } from 'next/server';

// In-memory store — persists for the lifetime of the server process
const ratings = new Map<string, unknown>();

export const revalidate = 0;

// Backend POSTs the rating here
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomName, rating } = body as { roomName: string; rating: unknown };
    if (!roomName || !rating) {
      return new NextResponse('Missing roomName or rating', { status: 400 });
    }
    ratings.set(roomName, rating);
    // Auto-cleanup after 10 minutes
    setTimeout(() => ratings.delete(roomName), 10 * 60 * 1000);
    return NextResponse.json({ success: true });
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
}

// Frontend GETs the rating by roomName
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomName = searchParams.get('roomName');
  if (!roomName) return new NextResponse('Missing roomName', { status: 400 });

  const rating = ratings.get(roomName);
  if (!rating) return NextResponse.json({ found: false });
  return NextResponse.json({ found: true, rating });
}
