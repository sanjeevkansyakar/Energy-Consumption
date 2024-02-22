"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import useSWR from "swr";

export const Log = () => {
    const logsData = async () => {
        const res = await axios.get("/api/logs");
        mutate(res.data);
        return res.data;
    };

    const { data, mutate } = useSWR("/api/logs", logsData);

    return (
        <>
            {data?.logs.map((log) => (
                <div
                    className={cn(
                        "flex flex-col items-center justify-center m-4 gap-4 bg-gray-200 rounded-md p-4"
                    )}
                    key={log._id}
                >
                    <div className="flex justify-between items-center w-full">
                        <p className="font-medium leading-none">
                            {log.employeeName}
                        </p>
                        <p className="font-medium leading-none">
                            Access Date:{" "}
                            {new Date(log.accessDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="font-medium leading-none">
                            From: {new Date(log.fromDate).toLocaleDateString()}
                        </p>
                        <p className="font-medium leading-none">
                            To: {new Date(log.toDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
};
