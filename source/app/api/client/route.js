import { insert_route } from "@/database_configs/db_router.js";

export async function POST(request) {
    const body = await request.json();
    const query = `
        INSERT INTO client_record (
            client_id, client_name, picture_doc_path, birthdate, birthplace,
                age, sex, citizenship, no_of_dependents, marital_status,
                present_address, length_of_stay_present, same_as_present, permanent_address,
                mailing_address, mothers_maiden_name, mobile_no, email,
                tin_no, sss_gsis_no, other_id_no, educational_attainment, home_ownership,
                 gross_monthly_income, monthly_expenses, investments, business, pension, other_income_source
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const {
            client_id, client_name, picture_doc_path, birthdate, birthplace,
            age, sex, citizenship, no_of_dependents, marital_status,
            present_address, length_of_stay_present, same_as_present, permanent_address,
            mailing_address, mothers_maiden_name, mobile_no, email,
            tin_no, sss_gsis_no, other_id_no,educational_attainment, home_ownership,
            gross_monthly_income, monthly_expenses, investments, business, pension, other_income_source
        } = body;

        const values = [
            client_id, 
            client_name, 
            picture_doc_path, 
            birthdate, 
            birthplace,
            age ? Number(age) : 0, 
            sex, 
            citizenship, 
            no_of_dependents ? Number(no_of_dependents) : 0,
            marital_status,
            present_address, 
            length_of_stay_present ? Number(length_of_stay_present) : 0, 
            same_as_present ? 1 : 0, 
            permanent_address,
            mailing_address, 
            mothers_maiden_name, 
            mobile_no, 
            email,
            tin_no, 
            sss_gsis_no, 
            other_id_no || null,
            educational_attainment, 
            home_ownership,
            gross_monthly_income ? Number(gross_monthly_income) : 0, 
            monthly_expenses ? Number(monthly_expenses) : 0, 
            investments ? 1 : 0, 
            business ? 1 : 0, 
            pension ? 1 : 0, 
            other_income_source ? 1 : 0
        ];

        return await insert_route(query, values, "Client record inserted successfully");
}
