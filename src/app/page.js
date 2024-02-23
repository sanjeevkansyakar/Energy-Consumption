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
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fromDate: "",
        toDate: "",
        accessTime: "",
        accessDate: "",
        employeeName: "",
    });

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
            setLoading(true);
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
            setFormData({
                fromDate: "",
                toDate: "",
                accessTime: "",
                accessDate: "",
                employeeName: "",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="grid md:grid-cols-12 gap-3 m-4 mt-10">
            <div className="md:col-span-4 flex flex-col justify-center mb-10">
                <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
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
                    <Button type="submit" disabled={loading ? true : false}>
                        Submit
                    </Button>
                </form>
            </div>
            <div className="md:col-span-8">
                <Suspense fallback={<p>Loading Data...</p>}>
                    <Chart data={chartData} />
                </Suspense>
            </div>
            <div className="rounded-md border border-black md:col-span-6 mt-10 max-h-[500px] overflow-y-scroll">
                <h2 className="pl-4 pt-4 font-semibold">Recent Logs</h2>
                <div>
                    <Log />
                </div>
            </div>
        </div>
    );
}
