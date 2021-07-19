//import {useParams} from "react-router-dom";
import {Header} from "../../components/Header";
import {Historic} from "../../components/Historic";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import api from "../../services/axiosConfig";

const Details = () => {
    const params = useParams();
    const id = params.id;
    const [occurrence, setOccurrence] = useState([]);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/denunciations/details/list/status/${id}`);
                setOptions(response.data)
                console.log(response.data)
            } catch (e) {
                console.log(e);
            }

        }
        const getData1 = async () => {
            try {
                const response = await api.get(`/denunciations/details/${id}`);
                setOccurrence(response.data)
            } catch (e) {
                console.log(e);
            }

        }
        getData();
        getData1();
        console.log(occurrence)
    }, [])
    const handleAlterStatus = async () => {
        const response = await api.post(`/denunciations/details/update/status/${id}/${selected}`)
        if (response.status === 200) {
            alert("Alterado com sucesso")
        }
    }

    const handleChange = (e) => {
        let {value} = e.target;
        setSelected(value);
    }

    const handleExport = async () => {
        const response = await api.get(`/export/file/${id}`);
        if (response.status === 200) {
            window.open(
                response.request.responseURL,
                '_blank'
            );
            console.log(response)
        } else {
            console.log("erro")
            console.log(response)
        }
    }

    if (occurrence.denunciation_user != null) {
        return (
            <>
                <Header/>
                <div className="container-details">
                    <div className="row">
                        <h1>Detalhes da ocorrência #{occurrence.code}</h1>
                        <button onClick={handleExport}>Download imagens</button>
                        <button onClick={handleAlterStatus}>Salvar</button>
                    </div>
                    <div className="row">
                        <div>
                            <span>Tipo de problema: </span>
                            <span>{occurrence.type}</span>
                        </div>
                        <div>
                            <select name="Status" id="status" onChange={handleChange}>
                                {
                                    options.map((i) => <option value={i.id} selected={i.selected}>{i.name} </option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>Descrição: </span>
                            <span>{occurrence.description}</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <h3>Localização</h3>
                    </div>
                    <div className="row">
                        <div>
                            <span>CEP: </span>{occurrence.denunciation_address != null ? occurrence.denunciation_address.zipcode : ""}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            {occurrence.denunciation_address != null ? occurrence.denunciation_address.street : ""}, {occurrence.denunciation_address != null ? occurrence.denunciation_address.number_house : ""}
                        </div>
                        <div>
                            {occurrence.denunciation_address != null ? occurrence.denunciation_address.neighborhood : ""}, {occurrence.denunciation_address != null ? occurrence.denunciation_address.city : ""}/{occurrence.denunciation_address != null ? occurrence.denunciation_address.state_uf : ""}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>Ponto de referencia:</span>
                            <span>{occurrence.denunciation_address != null ? occurrence.denunciation_address.reference_point : ""}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>Realizado em:</span>
                            <span>{occurrence.created}</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <h3>Dados do cidadão</h3>
                    </div>
                    <div className="row">
                        <div>
                            {occurrence.denunciation_user.user_name}
                        </div>
                        <div>
                            <span>Telefone principal: </span>
                            <span>{occurrence.denunciation_contact[0] != undefined ? occurrence.denunciation_contact[0].number:''}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <span>Outros telefones: </span>
                            {occurrence.denunciation_contact[1] != undefined ? occurrence.denunciation_contact[1].number:''}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>E-mail: </span>{occurrence.denunciation_user.user_email}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>CPF: </span> {occurrence.denunciation_user.user_cpf}
                        </div>
                    </div>
                    <div className="row">
                        <span>Endereço</span>
                    </div>
                    <div className="row">
                        <div>
                            <span>CEP: </span>{occurrence.denunciation_user.zip_code}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            {occurrence.denunciation_user.street}, {occurrence.denunciation_user.number_house}
                        </div>
                        <div>
                            {occurrence.denunciation_user.neighborhood}, {occurrence.denunciation_user.city}/{occurrence.denunciation_user.state_name}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <h3>Historico de alterações</h3>
                    </div>
                    <div className="list">
                        <div className="header-list">
                            <div className="number">
                                <h4>Data</h4>
                            </div>
                            <div className="type">
                                <h4>Nome</h4>
                            </div>
                            <div className="type">
                                <h4>Status</h4>
                            </div>
                        </div>
                        <div className="body-list">
                            {
                                occurrence.denunciation_historical_status !== undefined ?
                                    occurrence.denunciation_historical_status.map(item => <Historic
                                        item={item}/>) : null
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <></>
    }
}


export {Details}
