import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

// Correct GET handler for [roomId] dynamic route
export async function GET(
  req: Request, 
  { params }: { params: { roomId: string } } // Correct way to access params
) {
  const { roomId } = params;

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { roomId: string } }) {
  const { roomId } = params;

  try {
    // Create the room in the database if it doesn't already exist
    const room = await prisma.room.create({
      data: {
        id: roomId,
        name: `Room ${roomId}`,  // You can customize this name
        createdAt: new Date(),
      },
    });

    return NextResponse.json(room, { status: 201 }); // Return the newly created room
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating room' }, { status: 500 });
  }
}
