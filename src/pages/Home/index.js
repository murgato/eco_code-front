import {Header} from "../../components/Header";
import {FilterHome} from "../../components/FilterHome";
import {Occurrence} from "../../components/Occurrence";
import {useEffect, useState} from "react";
import api from "../../services/axiosConfig";

const Home = () => {
    const [occurrence, setOccurrence] = useState([]);

    useEffect( () => {
        const getData = async () => {
            const response = await api.get("/denunciations/list");
            setOccurrence(response.data);
        }
        try {
            getData();
        } catch (err){
            console.log(err);
        }

    }, [occurrence])

    return (
        <>
            <Header/>
            <div className="container-home">
                <FilterHome />
                <div >
                    <h2>Listagem de Ocorrências </h2>
                    <hr />
                    <div className="list">
                        <div className="header-list">
                            <div className="number">
                                <h4>Nº ocorrência</h4>
                            </div>
                            <div className="type">
                                <h4>Tipo de problema</h4>
                            </div>
                            <div className="type">
                                <h4>Dia</h4>
                            </div>
                            <div className="type">
                                <h4>Hora</h4>
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
                                occurrence.map(occurrence => <Occurrence key={occurrence.code} occurrence={occurrence}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Home};
