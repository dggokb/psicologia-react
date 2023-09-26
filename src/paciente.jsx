import { usePacienteData } from "./hooks/usePacienteData";
import PacienteTestePost from "./pacienteTestePost";

export default function Paciente() { 

  const { isInitialLoading, isError, data, error, refetch } = usePacienteData();
  
  return (  
    <div>    
        <button onClick={() => refetch()}>Obter Todos</button>
        {data?.data ? (
        <>
          <ul>
            {data?.data.map((dado) => (              
              <div key={dado.id}>
                <p>Nome: {dado.nome}</p>
                <p>Endereço: {dado.endereco}</p>
                <p>Data de inicio: {dado.dataDeInicio}</p>
                
                <p>Tipo: {dado.tipo}</p>
                <span>---------------------</span>
              </div>
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
