import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFechamentoData(id, mes, ano) {
  const API_URL = `http://localhost:8080/paciente/fechamento/${id}`;
  const token = localStorage.getItem("tokenDoUsuario");
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: {},
    params: {
      mes: mes,
      ano: ano
    }
  };

  return useQuery(['data', id, mes, ano], {
    queryFn: async () => await axios.get(API_URL, config),
    queryKey: ['fechamento-data'],
    refetchOnWindowFocus: false,
    enabled: Boolean(id, mes, ano),
  })
}

