import { useTiposDePacienteData } from "../hooks/useTiposDePacienteData";

export default function SelectDeTipoDePaciente({ mesData, selectedValue, onChange }: {
  mesData: string,
  selectedValue: string,
  onChange: (value: string) => void;
}) {
  const { isInitialLoading, isError, data, error, refetch } = useTiposDePacienteData();

  return (
    <>
      {data?.data ? (
        <select onChange={(e) => onChange(e.target.value)}>
          {data?.data.map((dado, index) => (
            <option key={index} value={dado.name} defaultValue={selectedValue}>{dado.descricao}</option>
          ))}
        </select>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isInitialLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}
    </>
  )
}
