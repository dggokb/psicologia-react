import { Form } from "react-bootstrap";
import { useTiposDePacienteData } from "../hooks/useTiposDePacienteData";

export default function SelectDeTipoDePaciente({ tipoDePacienteData, selectedValue, onChange }: {
  tipoDePacienteData: string,
  selectedValue: string,
  onChange: (value: string) => void;
}) {
  const { data } = useTiposDePacienteData();

  //TODO: criar componente de select e juntar com o meses
  return (
    <>
      {data && (
        <Form.Select onChange={(e) => onChange(e.target.value)}>
          {data?.data.map((dado, index) => (
            <option key={index} value={dado.name} defaultValue={selectedValue}>{dado.descricao}</option>
          ))}
        </Form.Select >
      )}
    </>
  )
}
