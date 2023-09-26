import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Paciente() { 

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

    const { isInitialLoading, isError, data, error, refetch, isFetching } =
            useQuery({
            queryKey: ['todos'],
            queryFn: fecthData,
            refetchOnWindowFocus: false,
            enabled: false,
        })
  
  return (  
    <div>    
        <button onClick={() => refetch()}>Fetch Todos</button>
        {data?.data ? (
        <>
          <ul>
            {data?.data.map((dado) => (
              <><p>Nome: {dado.nome}</p>
              <p>Endereço: {dado.endereco}</p>
              <p>Tipo: {dado.tipo}</p>
              <span>---------------------</span></>
            ))}
          </ul>
        </>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isInitialLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

    </div>
  )
}
