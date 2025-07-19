'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Lead {
  id: number
  nome: string
  email: string
  observacao: string | null
}

export default function Formulario2() {
  const [lead, setLead] = useState<Lead | null>(null)
  const [excluido, setExcluido] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Busca o último lead via API
    const fetchLead = async () => {
      const res = await fetch('/api/lead/ultimo')
      const data = await res.json()
      if (data?.lead) setLead(data.lead)
    }

    fetchLead()
  }, [])

  const handleExcluir = async () => {
    if (!lead) return

    await fetch(`/api/lead/excluir/${lead.id}`, {
      method: 'POST',
    })

    setLead(null)
    setExcluido(true)
  }

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col items-start p-8">
      <h1 className="text-lg font-semibold mb-6">
        textos mandados para o banco de dados
      </h1>

      {lead && !excluido && (
        <div className="relative bg-gray-900 p-6 rounded shadow w-full max-w-md">
          {/* Botões */}
          <div className="absolute top-2 right-2 flex gap-2">
            <a
              href={`/?nome=${encodeURIComponent(lead.nome)}&email=${encodeURIComponent(lead.email)}&observacao=${encodeURIComponent(lead.observacao || '')}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 py-1 rounded"
            >
              Editar
            </a>
            <button
              onClick={handleExcluir}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded"
            >
              Excluir
            </button>
          </div>

          {/* Dados */}
          <p><span className="font-bold">Nome:</span> {lead.nome}</p>
          <p><span className="font-bold">Email:</span> {lead.email}</p>
          <p><span className="font-bold">Observação:</span> {lead.observacao}</p>
        </div>
      )}

      {!lead && excluido && (
        <div className="text-left space-y-4">
          <p className="text-gray-300">Dados inexistentes</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
          >
            Home
          </button>
        </div>
      )}
    </div>
  )
}