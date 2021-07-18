import {Header} from "../../components/Header";
import {FilterUser} from "../../components/FilterUser";
import {User} from "../../components/User";
import {useEffect, useState} from "react";
import api from "../../services/axiosConfig";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await api.get("/users/list");
            setUsers(response.data);
        }
        try {
            getData();
        } catch (err){
            console.log(err);
        }

    }, [users])

    return (
        <>
            <Header/>
            <div className="container-user">
                <FilterUser/>
                <h2>Listagem de usuários</h2>
                <hr/>
                <div className="list">
                    <div className="header-list">
                        <div className="number">
                            <h4>Nº chapa</h4>
                        </div>
                        <div className="type">
                            <h4>Nome</h4>
                        </div>
                        <div className="type">
                            <h4>E-mail</h4>
                        </div>
                        <div className="type">
                            <h4>Status</h4>
                        </div>
                        <div className="type">
                            <h4>Ações</h4>
                        </div>
                    </div>
                    <div className="body-list">
                        {
                            users.map(user => <User key={user.id} user={user}/>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export {Users}
