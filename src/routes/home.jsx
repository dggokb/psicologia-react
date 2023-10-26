import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "./navbar";
import { ToastContainer } from "react-bootstrap";

export default function Home() {

    return (
        <>
            <div>
                <BarraDeNavegacao />
                <Outlet />            
            </div>
        </>
    )
}