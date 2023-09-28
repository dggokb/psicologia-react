import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import PacienteTestePost from './components/pacientePost';
import PacienteTesteSelect from './components/selectDeTipoDePaciente';
import PacienteGet from './components/pacienteGet';



const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <PacienteTestePost>
        <PacienteTesteSelect />
      </PacienteTestePost>
      <PacienteGet />
    </QueryClientProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)
