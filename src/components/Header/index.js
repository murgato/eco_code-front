import logo from '../../assets/logo1.svg';
import {useHistory, useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import {logout} from "../../services/auth";

const Header = () => {
    let location = useLocation();
    const history = useHistory();
    const [route, setRoute] = useState();
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        setRoute(location.pathname);
    }, [location])
    const handleLogout = () => {
        logout();
        history.push("/");
    }
    return (

        <header>
            <a href="/"><img src={logo} alt="Logo" /></a>
            <div className="header-links">
                <ul>
                    <li><a href="/" className={route === "/" ? "active" : null}>Listagem</a></li>
                    <li><a href="/relatorios" className={route === "/relatorios" ? "active" : null}>Relatórios</a></li>
                    <li><a href="/usuarios" className={route === "/usuarios" ? "active" : null}>Usuários</a></li>
                </ul>
            </div>
            <div className="user-info">
                Olá, {user.name}
                <div>
                    <button onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </header>
    );
}

export {Header};
