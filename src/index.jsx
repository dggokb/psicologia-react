import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './login';
import ErrorPage from './routes/error-page';
import Home from './routes/home';
import ConsultaPacientes from './routes/consultaPacientes';
import AdicionaPaciente from './routes/adicionaPaciente';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "home",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "consultar",
        element: <ConsultaPacientes />,
        errorElement: <ErrorPage />,
      },
      {
        path: "adicionar",
        element: <AdicionaPaciente queryClient={queryClient} />,
        errorElement: <ErrorPage />,
      }
    ]
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
