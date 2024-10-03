import { NextRequest, NextResponse } from 'next/server'
import { list, ListBlobResult } from '@vercel/blob'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const prefix = searchParams.get('prefix') || ''

  try {
    const result: ListBlobResult = await list({
      prefix,
      mode: 'folded',
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching blobs:', error)
    return NextResponse.json({ error: 'Failed to fetch blobs' }, { status: 500 })
  }
}
