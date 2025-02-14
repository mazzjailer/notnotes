import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST( NextRequest ) {
  const { title, content, userId } = await NextRequest.json()
  const note = await prisma.note.create({
    data: {
      title: title,
      content: content,
      userId: userId,
    },
  })
  return NextResponse.json(note);
}