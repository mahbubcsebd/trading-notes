import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  if (process.env.NODE_ENV !== 'development') {
    return notFound();
  }

  try {
    const body = await request.json();
    const { id, chart } = body;

    if (!id || !/^[\w-]+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid chart id' }, { status: 400 });
    }

    const safePath = path.join(process.cwd(), 'content', 'charts', `${id}.json`);
    if (!safePath.startsWith(path.join(process.cwd(), 'content', 'charts'))) {
      return NextResponse.json({ error: 'Path traversal rejected' }, { status: 403 });
    }

    await writeFile(safePath, JSON.stringify(chart, null, 2), 'utf-8');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
