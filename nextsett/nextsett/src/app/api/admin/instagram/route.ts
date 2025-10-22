import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCollection } from '@/lib/mongodb';
import { InstagramPost } from '@/types';

// GET - Fetch all Instagram posts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const instagramCollection = await getCollection('instagram_posts');
    const posts = await instagramCollection
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: posts
    });

  } catch (error) {
    console.error('Instagram fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    );
  }
}

// POST - Create new Instagram post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { url, thumbnail, caption, visible, order } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'Instagram URL is required' },
        { status: 400 }
      );
    }

    const instagramCollection = await getCollection('instagram_posts');
    
    const newPost: Omit<InstagramPost, '_id'> = {
      url,
      thumbnail: thumbnail || '',
      caption: caption || '',
      visible: visible !== false,
      order: order || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await instagramCollection.insertOne(newPost);

    return NextResponse.json({
      success: true,
      data: { ...newPost, _id: result.insertedId.toString() }
    });

  } catch (error) {
    console.error('Instagram create error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create Instagram post' },
      { status: 500 }
    );
  }
}
