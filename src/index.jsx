import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import ErrorPage from './routes/error-page';
import Home from './routes/home';
import PacienteGet from './routes/pacienteGet';
import PacientePost from './routes/pacientePost';
import Login from './login';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "paciente",
        element: <PacienteGet />,
      },
    ]
  },
  {
    path: "/buscar",
    element: <PacienteGet />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/adicionar",
    element: <PacientePost queryClient={queryClient}/>,
    errorElement: <ErrorPage />,
  },
  ,
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },

])

export default function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)
