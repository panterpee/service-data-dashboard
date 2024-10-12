import { connectToDatabase } from "@/app/lib/db";

export async function GET() {
    try {
        const conn = await connectToDatabase();

        const [results] = await conn.query(`
            SELECT 
                dataService.SN,
                dataService.date AS service_date,
                installData.date AS install_date,
                installData.location,
                TIMESTAMPDIFF(DAY, installData.date, dataService.date) AS total_days,
                FLOOR(TIMESTAMPDIFF(HOUR, installData.date, dataService.date) % 24) AS total_hours,
                FLOOR(TIMESTAMPDIFF(MINUTE, installData.date, dataService.date) % 60) AS total_minutes,
                FLOOR(TIMESTAMPDIFF(SECOND, installData.date, dataService.date) % 60) AS total_seconds,
                dataService.product,
                dataService.officerName,
                dataService.part,
                dataService.malfunction
            FROM 
                dataService
            JOIN 
                installData 
            ON 
                dataService.SN = installData.SN;
        `);

        console.log("Results sent:", results);
        return new Response(
            JSON.stringify(results),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: "Error fetching data", error }), { status: 500 });
    }
}
