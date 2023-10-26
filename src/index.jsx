import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './login';
import AdicionaPaciente from './routes/adicionaPaciente';
import ConsultaFechamento from './routes/consultaFechamento';
import ConsultaPacientes from './routes/consultaPacientes';
import ErrorPage from './routes/error-page';
import Home from './routes/home';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "home",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "consultar",
        element: <ConsultaPacientes />,
        errorElement: <ErrorPage />
      },
      {
        path: "adicionar",
        element: <AdicionaPaciente queryClient={queryClient} />,
        errorElement: <ErrorPage />
      },
      {
        path: "fechamento",
        element: <ConsultaFechamento />,
        errorElement: <ErrorPage />
      }
    ]
  }
])

export default function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)
