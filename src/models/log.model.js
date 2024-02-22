import mongoose, { Schema } from "mongoose";

const logsSchema = new Schema(
    {
        employeeName: {
            type: String,
            required: true,
        },
        accessDate: {
            type: Date,
            required: true,
        },
        accessTime: {
            type: String,
            required: true,
        },
        fromDate: {
            type: Date,
            required: true,
        },
        toDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const Logs = mongoose.models.logs || mongoose.model("logs", logsSchema);

export default Logs;
