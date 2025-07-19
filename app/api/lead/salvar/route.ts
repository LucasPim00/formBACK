import { NextRequest } from "next/server";
//import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, observacao, mensagem } = body;

    if (!nome || !email) {
      return new Response(JSON.stringify({ error: "Nome e email são obrigatórios." }), {
        status: 400,
      });
    }

//    const novoLead = await prisma.lead.create({
//      data: { nome, email, observacao, mensagem },
//    });

//    return new Response(JSON.stringify({ success: true, lead: novoLead }), {
//      status: 201,
//    });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    return new Response(JSON.stringify({ error: "Erro interno do servidor." }), {
      status: 500,
    });
  }
}