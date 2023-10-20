import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080/paciente/tipo'
const token = localStorage.getItem("tokenDoUsuario");

export function useTiposDePacienteData() {
    console.log(token)
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
        queryKey: ['tipo-data'],
        refetchOnWindowFocus: false
    })
}