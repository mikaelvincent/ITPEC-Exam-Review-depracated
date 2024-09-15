import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Failed to fetch user by ID');
  }
};

export const createGuestUser = async () => {
  try {
    const uid = `guest_${uuidv4()}`;
    return await prisma.user.create({
      data: { uid },
    });
  } catch (error) {
    console.error('Error creating guest user:', error);
    throw new Error('Failed to create guest user');
  }
};
