import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Mensagem from "../components/mensagem";

export function usePacienteData(nome) {

  const API_URL = 'http://18.230.188.37:8080/psicologia-0.3.0/paciente/consultar';
  const token = localStorage.getItem("tokenDoUsuario");
  const usuarioId = localStorage.getItem("usuario");
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: {},
    params: {
      nome: nome,
      usuarioId: usuarioId
    }
  };

  return useQuery(['data', nome], {
    queryFn: async () => {
      try {
        return await axios.get(API_URL, config)
      } catch (error) {
        Mensagem.exibirFalha(error.response.data.massage)
      }
    },
    queryKey: ['paciente-data'],
    refetchOnWindowFocus: false,
    retry: false
  })
}

