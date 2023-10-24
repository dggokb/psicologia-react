import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePacienteData(nome) {
  const API_URL = 'http://localhost:8080/paciente/consultar';
  const token = localStorage.getItem("tokenDoUsuario");
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: {},
    params: {
      nome: nome
    }
  };

  return useQuery({
    queryFn: async () => await axios.get(API_URL, config),
    queryKey: ['paciente-data'],
    refetchOnWindowFocus: false
  })
}

