import { Outlet } from "react-router-dom";
import useValidarToken from "../hooks/useValidarToken";
import BarraDeNavegacao from "./navbar";
import imagem from "../imagens/imagem.png"

export default function Home() {
    useValidarToken();
    return (
        <>
            <div>
                <BarraDeNavegacao />
                <div className="overlay d-flex justify-content-center" >
                    {/* <img src={imagem}git /> */}
                </div>
                <Outlet />
            </div>
        </>
    )
}