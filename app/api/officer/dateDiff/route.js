import { connectToDatabase } from "@/app/lib/db";

export async function GET() {
    try {
        const conn = await connectToDatabase();

        // SQL query ที่ปรับปรุงเพื่อนำข้อมูลอื่นๆ มาแสดง
        const [results] = await conn.query(`
            SELECT 
                dataService.sn,
                dataService.date AS service_date,
                installData.date AS install_date,
                TIMESTAMPDIFF(DAY, installData.date, dataService.date) AS day_diff,
                dataService.product,
                dataService.officerName,
                dataService.part,
                dataService.malfunction
            FROM 
                dataService
            JOIN 
                installData 
            ON 
                dataService.sn = installData.sn;
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
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ message: "Error fetching data", error }), { status: 500 });
    }
}
