import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCollection } from '@/lib/mongodb';
import { GalleryItem } from '@/types';

// GET - Fetch all gallery items
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const galleryCollection = await getCollection('gallery_items');
    const items = await galleryCollection
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: items
    });

  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

// POST - Create new gallery item
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
    const { imageUrl, category, title, description, order, visible } = body;

    if (!imageUrl || !category || !title) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const galleryCollection = await getCollection('gallery_items');
    
    const newItem: Omit<GalleryItem, '_id'> = {
      imageUrl,
      category,
      title,
      description: description || '',
      order: order || 0,
      visible: visible !== false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await galleryCollection.insertOne(newItem);

    return NextResponse.json({
      success: true,
      data: { ...newItem, _id: result.insertedId.toString() }
    });

  } catch (error) {
    console.error('Gallery create error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}
