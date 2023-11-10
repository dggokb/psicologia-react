import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Mensagem from "../components/mensagem";

const API_URL = 'https://18.230.187.245:8080/psicologia-0.3.0/paciente/tipo'
const token = localStorage.getItem("tokenDoUsuario");

export function useTiposDePacienteData() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: {},
    };
    return useQuery({
        queryFn: async () => {
            try {
                return await axios.get(API_URL, config)
            } catch (error) {
                Mensagem.exibirFalha(error.response.data.massage)
            }
        },
        queryKey: ['tipo-data'],
        refetchOnWindowFocus: false,
        retry: false
    })
}