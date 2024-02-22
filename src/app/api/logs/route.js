import Logs from "@/models/log.model";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const logs = await Logs.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ logs }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
