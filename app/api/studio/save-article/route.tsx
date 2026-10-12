import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  if (process.env.NODE_ENV !== 'development') {
    return notFound();
  }

  try {
    const body = await request.json();
    const { slug, content } = body;

    // Sanitize: only allow alphanumeric, hyphens, slashes, must start with content/learn
    if (!slug || !/^[\w/-]+\.mdx$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }

    const safePath = path.join(process.cwd(), 'content', 'learn', slug);
    if (!safePath.startsWith(path.join(process.cwd(), 'content', 'learn'))) {
      return NextResponse.json({ error: 'Path traversal rejected' }, { status: 403 });
    }

    await mkdir(path.dirname(safePath), { recursive: true });
    await writeFile(safePath, content, 'utf-8');

    return NextResponse.json({ ok: true, path: safePath });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
