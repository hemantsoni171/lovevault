import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: { roomId: string } }) {
  const { roomId } = params;

  try {
    // Fetch the room data from the database by Room ID
    const room = await prisma.room.findUnique({
      where: {
        id: roomId, // Match the room by the ID passed in the URL
      },
    });

    if (!room) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching room data' }, { status: 500 });
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
