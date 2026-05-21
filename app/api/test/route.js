import { connectToDatabase } from "../../../database_configs/db.js";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT * FROM client_record");
        return NextResponse.json(rows);
    } catch (err) {
        console.error("/api/test error:", err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const db = await connectToDatabase();
        
        const query = `
            INSERT INTO client_record (
                client_id, client_name, picture_doc_path, birthdate, birthplace,
                age, sex, citizenship, no_of_dependents, marital_status,
                present_address, length_of_stay_present, same_as_present, permanent_address,
                mailing_address, mothers_maiden_name, mobile_no, email,
                tin_no, sss_gsis_no, educational_attainment, home_ownership,
                gross_monthly_income, monthly_expenses, investments, business, pension, other_income_source
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            body.client_id, body.client_name, body.picture_doc_path, body.birthdate, body.birthplace,
            body.age, body.sex, body.citizenship, body.no_of_dependents, body.marital_status,
            body.present_address, body.length_of_stay_present, body.same_as_present, body.permanent_address,
            body.mailing_address, body.mothers_maiden_name, body.mobile_no, body.email,
            body.tin_no, body.sss_gsis_no, body.educational_attainment, body.home_ownership,
            body.gross_monthly_income, body.monthly_expenses, body.investments, body.business, body.pension, 
            body.other_income_source
        ];

        await db.query(query, values);
        return NextResponse.json({ message: "Client record inserted successfully" });

    } catch (err) {
        console.error("/api/client POST error:", err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }   
}
    
    