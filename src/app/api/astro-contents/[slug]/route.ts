import { NextResponse } from 'next/server';
import payload from 'payload';
import { getPayload } from 'payload/dist/payload';

// スラッグに基づいた単一のコンテンツを取得するAPI
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // PayloadCMSインスタンスの初期化
    const payloadInstance = await getPayload();
    
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }
    
    // スラッグに基づいてコンテンツを検索
    const result = await payloadInstance.find({
      collection: 'astro-contents',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
    });
    
    if (result.docs.length === 0) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.docs[0]);
  } catch (error) {
    console.error('Error fetching Astro content by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Astro content' },
      { status: 500 }
    );
  }
}
