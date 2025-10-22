import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCollection } from '@/lib/mongodb';

// GET - Fetch all content blocks
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const contentCollection = await getCollection('content');
    const content = await contentCollection
      .find({})
      .sort({ key: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: content
    });

  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT - Update content block
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { key, title, content, language } = body;

    if (!key || !content) {
      return NextResponse.json(
        { success: false, error: 'Key and content are required' },
        { status: 400 }
      );
    }

    const contentCollection = await getCollection('content');
    
    const updateData = {
      title: title || '',
      content,
      language: language || 'en',
      updatedAt: new Date()
    };

    await contentCollection.updateOne(
      { key },
      { $set: updateData },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully'
    });

  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
