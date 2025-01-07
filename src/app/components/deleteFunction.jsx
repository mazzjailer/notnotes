'use server'
import { PrismaClient } from '@prisma/client';

export async function deleteFunction(id) {
  const prisma = new PrismaClient();
  await prisma.note.delete({
    where: { id: Number(id) }
    });
}