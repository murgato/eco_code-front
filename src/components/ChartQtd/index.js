import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";


const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <strong>{`${label} : ${payload[0].value}`}</strong>
            </div>
        );
    }

    return null;
};
const ChartQtd = props => {
    return (
        <BarChart
            width={700}
            height={500}
            data={props.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend/>
            <Bar dataKey="Quantidade" barSize={20} fill="#0077B3"/>
        </BarChart>
    );
}

export {ChartQtd}
