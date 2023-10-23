import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "./navbar";

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