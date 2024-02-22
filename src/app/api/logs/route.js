import Logs from "@/models/log.model";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect();
        const logs = await Logs.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ logs }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
