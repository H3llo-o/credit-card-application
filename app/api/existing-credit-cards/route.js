import { insert_route } from "@/database_configs/db_router.js";

export async function POST(request) {
    const body = await request.json();
    const query = `
        INSERT INTO existing_credit_cards(
            card_number, client_id, issuer, card_type, credit_limit, 
            outstanding_balance, membership_date) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const {
            card_number, client_id, issuer, card_type, credit_limit, outstanding_balance, membership_date
        } = body;

        const values = [
            card_number,
            client_id,
            issuer,
            card_type,
            credit_limit ? Number(credit_limit) : 0.00,
            outstanding_balance ? Number(outstanding_balance) : 0.00,
            membership_date
        ];

        return await insert_route(query, values, "Existing credit card record inserted successfully");
}
