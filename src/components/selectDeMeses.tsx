import { Form } from "react-bootstrap";
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
        <Form.Select  onChange={(e) => onChange(e.target.value)} >
          {data?.data.map((dado, index) => (
            <option key={index} value={dado.name} defaultValue={selectedValue}>{dado.descricao}</option>
          ))}
        </Form.Select >
      ) : isError ? (
        <>Error: {error.message}</>
      ) : isInitialLoading ? (
        <>Loading...</>
      ) : (
        <>Not ready ...</>
      )}
    </>
  )
}
