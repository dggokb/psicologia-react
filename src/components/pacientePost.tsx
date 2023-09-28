import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useTiposDePacienteData } from "../hooks/useTiposDePacienteData";
import PacienteTesteSelect from "./selectDeTipoDePaciente";

export default function PacienteTestePost() {

  const [nome, setNome] = useState();
  const [endereco, setEndereco] = useState();
  const [quantidaDeDiasNoMes, setQuantidaDeDiasNoMes] = useState();
  const [valorPorSessao, setValorPorSessao] = useState();
  const [mes, setMes] = useState();
  const [ano, setAno] = useState();
  const [tipo, setTipo] = useState("VALOR_POR_SESSAO");

  const mutation = useMutation((dadosParaCriacao) => {
    return axios.post("http://localhost:8080/paciente", dadosParaCriacao);
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paciente-data');
      },
    }
  );

  const criarPaciente = (e) => {
    e.preventDefault();
    const dadosParaCriacao = {
      nome,
      endereco,
      quantidaDeDiasNoMes,
      valorPorSessao,
      mes,
      ano,
      tipo
    };
    mutation.mutate(dadosParaCriacao);
  };

  return (
    <div>
      <form onSubmit={criarPaciente}>
        <div>
          <span>Nome:</span><input type="text" onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <span>Endereço:</span><input type="text" onChange={(e) => setEndereco(e.target.value)} />
        </div>
        <div>
          <span>Quantidade de dias no mês:</span><input type="number" onChange={(e) => setQuantidaDeDiasNoMes(e.target.value)} />
        </div>
        <div>
          <span>Valor por sessão:</span><input type="number" onChange={(e) => setValorPorSessao(e.target.value)} />
        </div>
        <div>
          <span>Mês:</span><input type="text" onChange={(e) => setMes(e.target.value)} />
        </div>
        <div>
          <span>Ano:</span><input type="number" onChange={(e) => setAno(e.target.value)} />
        </div>
        <div>
          <span>Tipo: </span>
          <PacienteTesteSelect selectedValue={tipo} onChange={setTipo} />
          {console.log(tipo)}

        </div>      
        <input type="submit" value={mutation.isSuccess ? "Salvo!" : "Salvar"} />
      </form>
    </div>
  )
}