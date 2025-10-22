import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// PUT - Update Instagram post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { url, thumbnail, caption, visible, order } = body;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const instagramCollection = await getCollection('instagram_posts');
    
    const updateData = {
      ...(url && { url }),
      ...(thumbnail !== undefined && { thumbnail }),
      ...(caption !== undefined && { caption }),
      ...(visible !== undefined && { visible }),
      ...(order !== undefined && { order }),
      updatedAt: new Date()
    };

    const result = await instagramCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Instagram post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Instagram post updated successfully'
    });

  } catch (error) {
    console.error('Instagram update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update Instagram post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete Instagram post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const instagramCollection = await getCollection('instagram_posts');
    
    const result = await instagramCollection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Instagram post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Instagram post deleted successfully'
    });

  } catch (error) {
    console.error('Instagram delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete Instagram post' },
      { status: 500 }
    );
  }
}
