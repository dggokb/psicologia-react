import { useMesData } from "../hooks/useMesData";

export default function SelectDeMeses({ mesData, selectedValue, onChange }: {
  mesData: String,
  selectedValue: string,
  onChange: (value: string) => void;
}) {
  const { isInitialLoading, isError, data, error, refetch } = useMesData();

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
