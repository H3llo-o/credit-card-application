import { db_connect } from "@/database_configs/db.js";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request) {
    
    let connection;

    try {
        const db = await db_connect();
        const { authentication_email, client_password } = await request.json();
        const connection = await db.getConnection();

        const current_year = new Date().getFullYear();
        const [existing_user] = await connection.query(
            "SELECT client_id FROM client_authentication WHERE client_id LIKE ? ORDER BY client_id DESC LIMIT 1",
            [`CLN-${current_year}-%`]
        );

        let next_client = 1;
        if (existing_user.length > 0) {
            const last_client_id = existing_user[0].client_id;
            const split_id = last_client_id.split("-");
            next_client = parseInt(split_id[2]) + 1;
        }

        const new_client_id = `CLN-${current_year}-${String(next_client).padStart(8, "0")}`;
        const hashed_password = await bcrypt.hash(client_password, 12);

        await connection.beginTransaction();

        try {
            await connection.execute(
                "INSERT INTO client_authentication (client_id, authentication_email, client_password) VALUES (?, ?, ?)",
                [new_client_id, authentication_email, hashed_password]
            );

            await connection.commit();

            return NextResponse.json({ 
                success: true, 
                message: "User registered successfully", 
                client_id: new_client_id 
            }, { status: 201 });
            
        } catch (db_error) {
            await connection.rollback();
            throw db_error;
        }

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ 
            error: "Registration failed", 
            details: String(error) 
        }, { status: 500 });
    
    } finally {
        if (connection) {
           connection.release();
        }
    }
}

