'use server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';

export async function deleteFunction(id) {
  const prisma = new PrismaClient();
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    redirect('/sign-in');
  }

  await prisma.note.delete({
    where: {
      id: Number(id),
      userId: session.user.id
    }
    });
}