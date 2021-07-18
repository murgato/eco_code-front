import {Cell, Legend, Pie, PieChart} from "recharts";
import React from "react";

const ChartPerc = props => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#037", "#875"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
                                       cx,
                                       cy,
                                       midAngle,
                                       innerRadius,
                                       outerRadius,
                                       percent,
                                       index
                                   }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }
    return (
        <PieChart width={500} height={500}>
            <Legend layout={'vertical'}/>
            <Pie
                data={props.data}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
            >
                {props.data.map((entry, index) => (
                    <>
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    </>
                ))}
            </Pie>
        </PieChart>
    );
}

export {ChartPerc}
