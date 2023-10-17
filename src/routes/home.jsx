import { Link } from "react-router-dom";

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
                <nav>
                    <Link to="/login">Login</Link>
                </nav>
            </div>
        </>
    )
}