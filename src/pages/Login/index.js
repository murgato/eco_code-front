import logo from '../../assets/logo1.svg';
import {useHistory} from 'react-router-dom';
import api from "../../services/axiosConfig";
import {useState} from "react";
import {login} from "../../services/auth";

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            let bodyFormData = new FormData();
            bodyFormData.append("email", email);
            bodyFormData.append("password", password);

            const response = await api.post("/login", bodyFormData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            if (response != null) {
                login(response.data);
                history.push("/")
            } else {
                alert("Não encontrado")
            }
        } catch (err) {
            alert("Não encontrado")
            console.log(err)
        }

    }
    return (
        <div className='container-login '>
            <img src={logo} alt='Logo'/>
            <form>
                <input type="text" value={email} onChange={t => setEmail(t.target.value)} placeholder="Digite seu e-mail"/>
                <input type="password" value={password} onChange={t => setPassword(t.target.value)}
                       placeholder="Digite sua senha"/>
                <button type="button" onClick={handleLogin}>Entrar</button>
            </form>
        </div>
    );
}

export {Login};
