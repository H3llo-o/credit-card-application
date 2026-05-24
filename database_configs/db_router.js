import { db_connect } from "./db.js";
import { NextResponse } from "next/server";

export async function insert_route(sql_query, query_values, success_ping = "Query executed successfully") {
    try {
        const db = await db_connect();
        const [result] = await db.query(sql_query, query_values);
        return NextResponse.json({ 
            success: true,
            message: success_ping, 
            insertId: result.insertId 
        });
    } catch (err) {
        console.error("Database query error:", err);
        return NextResponse.json({ 
            success: false, 
            error:  "Operation failed" , 
            details: String(err)
        }, { status: 500 });
    }
}