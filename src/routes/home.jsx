import { Link } from "react-router-dom";

export default function Home() {
    const token = localStorage.getItem("tokenDoUsuario");
    console.log(token)

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