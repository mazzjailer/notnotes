import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function GET( NextRequest ) {
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes);
}

export async function POST( NextRequest ) {
  const { title, content } = await NextRequest.json()
  const note = await prisma.note.create({
    data: {
      title: title,
      content: content,
    },
  })
  return NextResponse.json(note);
}