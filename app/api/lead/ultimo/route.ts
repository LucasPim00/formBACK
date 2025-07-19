//import { prisma } from "@/lib/prisma";
//import { NextResponse } from "next/server";

//export async function GET() {
//  const lead = await prisma.lead.findFirst({
//    orderBy: { id: "desc" },
//  });

//  return NextResponse.json({ lead });
//}

// Rota desativada temporariamente
export function GET() {
  return new Response("Rota inativa", { status: 204 })
}