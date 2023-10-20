import { Link } from "react-router-dom";
import { usePacienteData } from "../hooks/usePacienteData";


export default function ConsultarPacientes() {

  const { isInitialLoading, isError, data, error, refetch } = usePacienteData();

  return (
    <div>
      <nav>
        <Link to="/home">Voltar</Link>
      </nav>
      <button onClick={() => refetch()}>Obter Todos</button>
      {data?.data ? (
        <>
          <ul>
            {data?.data.map((dado) => (
              <div key={dado.id}>
                <p>Nome: {dado.nome}</p>
                <p>Endereço: {dado.endereco}</p>
                <p>Data de inicio: {dado.dataDeInicio}</p>
                <span>-----Valores:-----</span>
                {dado.valores.map((valor) => (
                  <div>
                    <p>Quantidade de dias no mês: {valor.quantidaDeDiasNoMes}</p>
                    <p>Valor por sessão: {valor.valorPorSessao}</p>
                    <p>Mês: {valor.mes}</p>
                    <p>Ano: {valor.ano}</p>
                  </div>
                ))}
                <span>-----Valores:-----</span>
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
