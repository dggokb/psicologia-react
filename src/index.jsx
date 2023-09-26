import React from 'react';
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import Paciente from './paciente';
import PacienteTestePost from './pacienteTestePost';


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}
    contextSharing={true}>
      <Paciente />
      <PacienteTestePost />
    </QueryClientProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)
