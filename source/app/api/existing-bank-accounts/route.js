import insert_route from "@/database_configs/db_router.js";

export async function POST(request) {
    const body = await request.json();
    const query = `
        INSERT INTO existing_bank_accounts(
            account_no, client_id, bank_name, account_type, account_balance) VALUES (?, ?, ?, ?, ?)
        `;

        const {
            account_no, client_id, bank_name, account_type, account_balance
        } = body;

        const values = [
            account_no,
            client_id,
            bank_name,
            account_type,
            account_balance ? Number(account_balance) : 0.00
        ];

        return await insert_route(query, values, "Existing bank account record inserted successfully");
}
