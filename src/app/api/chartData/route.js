import { connect } from "@/dbConfig/dbConfig";
import Data from "@/models/data.model.js";
import Log from "@/models/log.model";

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { fromDate, toDate, accessTime, accessDate, employeeName } =
            reqBody;

        const data = await Data.find({
            createdAt: {
                $gte: new Date(fromDate),
                $lte: new Date(toDate),
            },
        });

        if (!data) {
            throw new Error("Data is not available.");
        }

        // console.log(data);
        const newLog = await Log.create({
            employeeName,
            accessDate,
            accessTime,
            fromDate,
            toDate,
        });

        await newLog.save();

        return Response.json({ data }, { status: 200 });
    } catch (error) {
        return Response.json({ message: error }, { status: 500 });
    }
}
