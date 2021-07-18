import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.svg';
import React, {useState} from "react";
import {Modal} from "@material-ui/core";
import validator from "validator/es";
import api from "../../services/axiosConfig";


const User = props => {
    const showActions = () => {
        setActions(!actions)
        if (arrow === arrowDown) {
            setArrow(arrowUp);
        } else {
            setArrow(arrowDown)
        }
    }
    const [actions, setActions] = useState(false);
    const [arrow, setArrow] = useState(arrowDown);
    const [open, setOpen] = useState(false);
    const [chapa, setChapa] = useState(props.user.chapa_number);
    const [name, setName] = useState(props.user.name);
    const [cpf, setCpf] = useState(props.user.cpf);
    const [email, setEmail] = useState(props.user.email);
    const [errorEmail, setErrorEmail] = useState(false);
    const handleOnChange = () => {
        setOpen(!open);
    }

    const handleOnSave = async () => {
        if (!validator.isEmail(email)) {
            setErrorEmail(true);
            return;
        }
        try {
            let bodyFormData = new FormData();
            bodyFormData.append("user_id", props.user.id);
            bodyFormData.append("email", email);
            bodyFormData.append("name", name);
            bodyFormData.append("cpf", cpf);
            bodyFormData.append("chapa_number", chapa);
            const response = await api.post("/users/edit", bodyFormData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            if (response.status === 200) {
                alert("ok");
                setOpen(false);
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="card">
            <div className="item">
                <div className="number">
                    <h4>{props.user.chapa_number}</h4>
                </div>
                <div className="type">
                    <h4>{props.user.name}</h4>
                </div>
                <div className="type">
                    <h4>{props.user.email}</h4>
                </div>
                <div className="type">
                    <h4>{
                        props.user.active ? "Ativo" : "Desativado"
                    }</h4>
                </div>
                <div className="type">
                    <button onClick={showActions}>
                        <img src={arrow} alt="Seta"/>
                    </button>
                </div>
            </div>
            {
                actions ? (
                    <div className="actions">
                        <hr/>
                        <div>
                            <button onClick={() => setOpen(true)}>Editar</button>
                            <button>Desativar</button>
                        </div>
                    </div>
                ) : null
            }
            <Modal
                open={open}
                onClose={handleOnChange}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="modal">
                    <h2 id="simple-modal-title">Editar</h2>
                    <input type="text" placeholder="Nº a chapa" value={chapa} onChange={e => setChapa(e.target.value)}/>
                    <input type="text" placeholder="Digite o nome" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="text" placeholder="Digite o cpf" value={cpf} onChange={e => setCpf(e.target.value)}/>
                    <input type="email" placeholder="Digite o e-mail" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    {errorEmail && (
                        <div className="error">E-mail invalido</div>
                    )}

                    <div className="btn-container">
                        <button onClick={handleOnSave}>Salvar</button>
                        <button onClick={handleOnChange}>Cancelar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export {User}
