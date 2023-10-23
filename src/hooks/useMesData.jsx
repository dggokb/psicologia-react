import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080/mes'
const token = localStorage.getItem("tokenDoUsuario");

export function useMesData() {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    data: {},
  };
  return useQuery({
    queryFn: async () => await axios.get(API_URL, config),
    queryKey: ['mes-data'],
    refetchOnWindowFocus: false
  })
}

