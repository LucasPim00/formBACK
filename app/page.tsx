'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({ nome: '', email: '', observacao: '' })
  const [mensagem, setMensagem] = useState('')

  // Preencher os campos com os dados da URL, se existirem
  useEffect(() => {
    const nome = searchParams.get('nome')
    const email = searchParams.get('email')
    const observacao = searchParams.get('observacao')

    if (nome || email || observacao) {
      setFormData({
        nome: nome || '',
        email: email || '',
        observacao: observacao || '',
      })
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('/api/lead/salvar', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      setMensagem('Formulário enviado com sucesso!')
      setFormData({ nome: '', email: '', observacao: '' })
    } else {
      setMensagem('Erro ao enviar o formulário.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Formulário em Next</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block mb-1">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome Completo"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email, Hotmail, Outlook"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black rounded mt-1"
            />
          </div>

          <div>
            <label htmlFor="observacao" className="block mb-1">Observação:</label>
            <textarea
              id="observacao"
              name="observacao"
              placeholder="Sua mensagem"
              value={formData.observacao}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black rounded mt-1"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enviar
          </button>
        </form>

        {mensagem && (
          <div className="mt-6 text-center">
            <p className="text-green-400 font-semibold inline-block mr-4">{mensagem}</p>
            <button
              onClick={() => window.location.href = '/formulario2'}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-full"
            >
              1
            </button>
          </div>
        )}
      </div>
    </div>
  )
}