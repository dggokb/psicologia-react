import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080/paciente'

const config = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  data: {},
};

export function usePacienteData() {
  return useQuery({
    queryFn: async () => await axios.get(API_URL, config),
    queryKey: ['paciente-data'],
    refetchOnWindowFocus: false,
    enabled: false
  })
}

