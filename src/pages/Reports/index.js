import React, {useEffect, useState} from "react";
import {Header} from "../../components/Header";
import {ChartQtd} from "../../components/ChartQtd";
import {ChartPerc} from "../../components/ChartPerc";
import api from "../../services/axiosConfig";


const Reports = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await api.get("/dashboard/home");
            setData(response.data.dash1);
            setData1(response.data.dash2);
        }
        getData();
    }, [])
    const getTotal = () => {
        let sum = 0;
        data.forEach(i => {
            sum += i.Quantidade;
        })
        return sum;
    }
    return (
        <>
            <Header/>
            <div className="container-reports">
                <div className="row">
                    <div>
                        <h4>Quantidade mensal</h4>
                        <select name="year" id="year">
                            <option value="2021">2021</option>
                        </select>
                        <select name="type" id="type">
                            <option value="desmatamento">Todos</option>
                            <option value="desmatamento">Desmatamento</option>
                        </select>
                        <ChartQtd data={data}/>
                        <span>Total anual: </span> {getTotal()}
                    </div>
                    <div>
                        <h4>Porcentagem por tipo de ocorrencia</h4>
                        <div style={{display: "flex", justifyContent: "center", minWidth: '30vw'}}>
                            <ChartPerc data={data1}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Reports}


