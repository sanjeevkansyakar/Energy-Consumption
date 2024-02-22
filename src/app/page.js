"use client";

import Chart from "@/components/Chart";
import { Log } from "@/components/Log";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Suspense, useState } from "react";

export default function Home() {
    const [chartData, setChartData] = useState([]);
    const [formData, setFormData] = useState({
        fromDate: "",
        toDate: "",
        accessTime: "",
        accessDate: "",
        employeeName: "",
    });
    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/chartData", formData);
            const data = response.data.data;

            const cleanupData = data.reduce((accumulator, current) => {
                current.createdAt = new Date(
                    current.createdAt
                ).toLocaleDateString();
                accumulator.push(current);
                return accumulator;
            }, []);
            setChartData(cleanupData);
            setFormData({});
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className="w-full h-screen flex items-center justify-center space-y-4">
                <div className="w-1/3 flex flex-col justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-xs mx-auto"
                    >
                        <div className="mb-4">
                            <Label htmlFor="employeeName">Employee Name:</Label>
                            <Input
                                type="text"
                                id="employeeName"
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="accessTime">Access Time:</Label>
                            <Input
                                type="time"
                                id="accessTime"
                                name="accessTime"
                                value={formData.accessTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="accessDate">Access Date:</Label>
                            <Input
                                type="date"
                                id="accessDate"
                                name="accessDate"
                                value={formData.accessDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="fromDate">Date Range:</Label>
                            <div className="flex gap-2">
                                <div>
                                    <Label htmlFor="fromDate">From:</Label>
                                    <Input
                                        type="date"
                                        id="fromDate"
                                        name="fromDate"
                                        value={formData.fromDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="toDate">To:</Label>
                                    <Input
                                        type="date"
                                        id="toDate"
                                        name="toDate"
                                        value={formData.toDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
                <div className="w-2/3 h-screen flex justify-center items-center">
                    <Suspense fallback={<p>Loading Data...</p>}>
                        <Chart data={chartData} />
                    </Suspense>
                </div>
            </div>
            <div className="rounded-md border border-black w-2/5 max-h-[500px] m-10 overflow-y-scroll">
                <h2 className="pl-4 pt-4 font-semibold">Recent Logs</h2>
                <div>
                    <Log />
                </div>
            </div>
        </div>
    );
}
