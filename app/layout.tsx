import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Formulário Next',
  description: 'Formulário Next.js com Tailwind e Prisma',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}