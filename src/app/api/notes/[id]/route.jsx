import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET( NextRequest, {params} ) {
  const { id } = await params;
  const note = await prisma.note.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(note);
}

export async function PUT( NextRequest, {params} ) {
  const { id } = await params;
  const { title, content } = await NextRequest.json()
  const updatedNote = await prisma.note.update({
    where: { id: Number(id) } ,
    data: {
      title: title,
      content: content,
      date: new Date,
    },
  })
  return NextResponse.json(updatedNote);
}

export async function DELETE( NextRequest, {params} ) {
  const { id } = await params;
  const deletedNote = await prisma.note.delete({
    where: { id: Number(id) }
  })
  return NextResponse.json(deletedNote);
}
