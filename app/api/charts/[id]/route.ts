import { NextResponse } from 'next/server';
import { getChartById } from '@/lib/charts';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const chart = getChartById(id);

  if (!chart) {
    return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
  }

  return NextResponse.json(chart);
}
