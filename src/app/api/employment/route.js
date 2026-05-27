import insert_route from "@/database_configs/db_router.js";

export async function POST(request) {
    const body = await request.json();
    const query = `
        INSERT INTO employment_record(
            client_id, employment_status, occupation, position, nature_of_work, 
            date_hired, years_working, office_phone_no, previous_employer,
            current_company, current_office_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const {
            client_id, employment_status, occupation, position, nature_of_work, 
            date_hired, years_working, office_phone_no, previous_employer,
            current_company, current_office_address
        } = body;

        const values = [
            client_id,
            employment_status,
            occupation,
            position,
            nature_of_work,
            date_hired,
            years_working ? Number(years_working) : 0,
            office_phone_no,
            previous_employer || null,
            current_company,
            current_office_address
        ];

        return await insert_route(query, values, "Employment record inserted successfully");
}
