import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Login({ queryClient }: {
    queryClient: QueryClient;
}) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const mutation = useMutation((dadosParaCriacao) => {
        console.log(dadosParaCriacao)
        return axios.post("http://localhost:8080/auth/login", dadosParaCriacao);
    },
        {
            onSuccess: (retorno) => {
                localStorage.setItem("tokenDoUsuario", retorno.data.token);
            },
        }
    );

    const criarLogin = (e) => {
        e.preventDefault();
        const dadosParaCriacao = {
            username,
            password,
        };
        mutation.mutate(dadosParaCriacao);
    };


    return (
        <section>
            <form onSubmit={criarLogin}>

                <h3 className="fw-normal mb-3 pb-3">Log in</h3>

                <div className="form-outline mb-4">
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                    <label className="form-label">Usuário</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form2Example28" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                    <label className="form-label">Senha</label>
                </div>

                <div className="pt-1 mb-4">
                    <input type="submit" value={mutation.isSuccess ? "Logado!" : "Logar"} />
                </div>
            </form>
        </section >
    )
}