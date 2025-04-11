import { NextResponse } from 'next/server';
import payload from 'payload';
import { getPayload } from 'payload/dist/payload';

// すべてのコンテンツを取得するAPI
export async function GET(request: Request) {
  try {
    // PayloadCMSインスタンスの初期化
    const payloadInstance = await getPayload();
    
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // クエリパラメータを取得
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'published';
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    
    // クエリの条件を構築
    const where: any = {
      status: {
        equals: status,
      },
    };
    
    // カテゴリーが指定されていれば条件に追加
    if (category) {
      where.category = {
        equals: category,
      };
    }
    
    // PayloadCMSからコンテンツを取得
    const result = await payloadInstance.find({
      collection: 'astro-contents',
      where,
      limit,
      page,
      sort: '-publishedDate',
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching Astro contents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Astro contents' },
      { status: 500 }
    );
  }
}
