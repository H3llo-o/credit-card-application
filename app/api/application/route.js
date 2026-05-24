import { insert_route } from "@/database_configs/db_router.js";

export async function POST(request) {
    const body = await request.json();
    const query = `
        INSERT INTO application_record(
            application_id, client_id, application_date, credit_card_type) VALUES (?, ?, ?, ?)
        `;

        const {
            application_id, client_id, application_date, credit_card_type
        } = body;

        const values = [
            application_id,
            client_id,
            application_date,
            credit_card_type
        ];

        return await insert_route(query, values, "Application record inserted successfully");
}
