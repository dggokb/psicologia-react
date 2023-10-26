import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default class Mensagem {

    static exibirSucesso(menasgem) {
        toast.success(menasgem, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    static exibirFalha(menasgem) {
        toast.error(menasgem, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }
}
