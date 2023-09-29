import { Link } from "react-router-dom";
import PacienteGet from "./pacienteGet";

export default function Home() {

    return (
        <>
            <div>
                <nav>
                    <Link to="/buscar">Buscar</Link>
                </nav>
                <nav>
                    <Link to="/adicionar">Adicionar</Link>
                </nav>
            </div>
        </>
    )
}