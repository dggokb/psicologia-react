import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "./navbar";
import useValidarToken from "../hooks/useValidarToken";

export default function Home() {
    useValidarToken();
    return (
        <>
            <div>
                <BarraDeNavegacao />
                <Outlet />
            </div>
        </>
    )
}