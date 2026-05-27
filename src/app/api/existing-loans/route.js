import { insert_route } from "@/database_configs/db_router.js";

export async function POST(request) {
    const body = await request.json();
    const query = `
        INSERT INTO existing_loans(
            loan_id, client_id, lender, loan_type, loan_balance, monthly_amortization) VALUES (?, ?, ?, ?, ?, ?)
        `;

        const {
            loan_id, client_id, lender, loan_type, loan_balance, monthly_amortization   
        } = body;

        const values = [
            loan_id,
            client_id,
            lender,
            loan_type,
            loan_balance ? Number(loan_balance) : 0.00,
            monthly_amortization ? Number(monthly_amortization) : 0.00
        ];

        return await insert_route(query, values, "Existing loan rerd inserted successfully");
}
