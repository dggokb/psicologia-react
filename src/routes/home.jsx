import { Link, Outlet } from "react-router-dom";
import Navbar from "./navbar";
import AdicionarPaciente from "./adicionaPaciente";
import ConsultaPacientes from "./consultaPacientes";

export default function Home() {

    return (
        <>
            <div>
                <Navbar />
                <Outlet />                
            </div>
        </>
    )
}