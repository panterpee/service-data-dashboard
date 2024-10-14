import { connectToDatabase } from "@/app/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ message: "ID is required." }), { status: 400 });
  }

  console.log("ID received:", id);

  try {
    const conn = await connectToDatabase();
    const [results] = await conn.query(`SELECT * FROM dataService WHERE id = ?`, [id]);

    if (results.length === 0) {
      console.error("No data found for the provided ID");
      return new Response(JSON.stringify({ message: "No data found" }), { status: 404 });
    }

    // console.log("Selected Data:", results);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ message: "Error fetching data", error }), { status: 500 });
  }
}
