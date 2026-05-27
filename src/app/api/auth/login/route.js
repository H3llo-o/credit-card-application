import { db_connect } from "@/database_configs/db.js";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request) {
    
    let connection;
    
    try {
        const db = await db_connect();
        const { authentication_email, client_password } = await request.json();
        const connection = await db.getConnection();

        const [user] = await connection.query(
            "SELECT client_id, client_password FROM client_authentication WHERE authentication_email = ?",
            [authentication_email]
        );

        if (user.length === 0) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid email or password" 
            }, { status: 401 });
        }

        const user_data = user[0];

        const password_match = await bcrypt.compare(client_password, user_data.client_password);

        if (!password_match) { 
            return NextResponse.json({ 
                success: false, 
                message: "Invalid email or password" 
            }, { status: 401 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Login successful", 
            client_id: user_data.client_id 
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ 
            error: "Login failed", 
            details: String(error) 
        }, { status: 500 });
    
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
