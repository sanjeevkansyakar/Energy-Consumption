"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
    return (
        <div className="w-full">
            <h2 className="text-4xl font-semibold ml-10">
                Energy Consumption(kwh)
            </h2>
            <ResponsiveContainer width="100%" aspect={2}>
                <BarChart
                    width={600}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="createdAt" />
                    <YAxis dataKey="total_kwh" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_kwh" stackId="a" fill="#8884d8" />
                    {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
