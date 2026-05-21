import {db} from "@/database_configs/db";

export async function GET() {
    const[rows] = await db.query("SELECT * FROM client_record");
    return Response.json(rows);
}

