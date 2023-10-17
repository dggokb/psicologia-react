import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Paciente from './paciente';
import PacienteTestePost from './pacienteTestePost';
import PacienteTesteSelect from './pacienteTesteSelect';


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      
      <PacienteTestePost />
      
    </QueryClientProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)
