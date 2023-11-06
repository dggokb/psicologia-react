import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ({ onClick, show, setShow }) {
    const esconderModal = () => setShow(false);
    const exibirModal = () => setShow(true);

    return (
        <>
            <Button variant="dark" onClick={exibirModal}>
                Alterar
            </Button>
            <Modal show={show} onHide={esconderModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de ação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você tem certeza que gostaria de salvar as alterações!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={esconderModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={(e) => onClick(e.target.value)}>
                        Salvar alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}