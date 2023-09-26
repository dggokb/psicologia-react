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

const fecthData = async () => {
    const response = await axios.get(API_URL, config);    

    return response;    
}

export function usePacienteData(){
    const query = useQuery({
      queryFn: fecthData,
      queryKey: ['paciente-data'],
      refetchOnWindowFocus: false,
      enabled: false
  })
  if(query?.data?.data) {
    console.log('entrou no if da query', query?.data?.data)
    return query?.data?.data;
  } 
}

export function obter(){
    console.log('Obter')
}

