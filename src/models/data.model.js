import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        serialNo: {
            type: String,
            required: true,
        },

        total_kwh: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Data = mongoose.models.datas || mongoose.model("datas", dataSchema);

export default Data;
