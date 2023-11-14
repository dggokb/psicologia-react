import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useValidarToken() {
    const navigate = useNavigate();
    const token = localStorage.getItem("tokenDoUsuario");
    const API_URL = 'https://18.230.188.37:8443/psicologia-0.3.0/auth/validar';
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: {},
        params: {
            token: token
        }
    };
    if (!token) {
        navigate('/')
    }

    return useQuery(['data', token], {
        queryFn: async () => {
            try {
                return await axios.get(API_URL, config)
            } catch (error) {
                navigate('/')
            }
        },
        queryKey: ['token-data'],
        refetchOnWindowFocus: false,
        retry: false,
    })
}