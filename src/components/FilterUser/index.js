import React, {useState} from "react";
import {Modal} from "@material-ui/core";
import api from "../../services/axiosConfig";
import validator from "validator/es";


const FilterUser = () => {
    const [open, setOpen] = useState(false);
    const [chapa, setChapa] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const handleOnChange = () => {
        setOpen(!open);
    }

    const handleOnSave = async () => {
        if (password !== confirm) {
            setErrorPassword(true);
            return;
        }
        if (!validator.isEmail(email)) {
            setErrorEmail(true);
            return;
        }
        try {
            let bodyFormData = new FormData();
            bodyFormData.append("email", email);
            bodyFormData.append("password", password);
            bodyFormData.append("name", name);
            bodyFormData.append("cpf", cpf);
            bodyFormData.append("chapa_number", chapa);
            const response = await api.post("/users/register", bodyFormData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            if (response.status === 200) {
                alert("ok");
            }
        } catch (err) {
            console.log(err)
        }
    }
    return <>
        <div className="row">
            <input type="text" placeholder="Buscar por nome ou nº chapa"/>
        </div>
        <div className="row">
            <select name="Status" id="Status">
                <option value="1">Todos</option>
            </select>
            <div className="btn-container">
                <button>Buscar</button>
                <button onClick={handleOnChange}>Novo</button>
            </div>
        </div>
        <Modal
            open={open}
            onClose={handleOnChange}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div className="modal">
                <h2 id="simple-modal-title">Criar nova conta</h2>
                <input type="text" placeholder="Nº a chapa" value={chapa} onChange={e => setChapa(e.target.value)}/>
                <input type="text" placeholder="Digite o nome" value={name} onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Digite o cpf" value={cpf} onChange={e => setCpf(e.target.value)}/>
                <input type="email" placeholder="Digite o e-mail" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                {errorEmail && (
                    <div className="error">E-mail invalido</div>
                )}

                <input type="password" placeholder="Digite a senha" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirmação de senha" value={confirm}
                       onChange={e => setConfirm(e.target.value)}/>
                {errorPassword && (
                    <div className="error">
                        Senhas não coincidem
                    </div>
                )}

                <div className="btn-container">
                    <button onClick={handleOnSave}>Salvar</button>
                    <button onClick={handleOnChange}>Cancelar</button>
                </div>
            </div>
        </Modal>
    </>
}
export {FilterUser}
