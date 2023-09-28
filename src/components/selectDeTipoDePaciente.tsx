import { useState } from "react";
import { useTiposDePacienteData } from "../hooks/useTiposDePacienteData";

export default function PacienteTesteSelect({ selectedValue, onChange }: {
  selectedValue: string,
  onChange: (value: string) => void;
}) {  
  const { isInitialLoading, isError, data, error, refetch } = useTiposDePacienteData();

  return (
    <div>
      {data?.data ? (
        <ul>
          <select onChange={(e) => onChange(e.target.value)}>
            {data?.data.map((dado, index) => (
              <option key={index} value={dado.name} selected={selectedValue === dado.name}>{dado.descricao}</option>
            ))}
          </select>
        </ul>
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
