import { db_connect } from "../../../database_configs/db.js";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await db_connect();
        const [rows] = await db.query("SELECT * FROM client_record");
        return NextResponse.json(rows);
    } catch (err) {
        console.error("/api/test error:", err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

        
    