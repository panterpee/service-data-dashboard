import { connectToDatabase } from "@/app/lib/db";

export async function POST(req) {
    try {
        const conn = await connectToDatabase();
        const DataRecieve = await req.json();
        const snId = DataRecieve.SN;
        const InsertModelName = DataRecieve.product;


        // Check exist SN in stock
        const [checkExistModel] = await conn.query(
            `SELECT modelSerial.SN, modelSerial.model_id, modelSerial.is_sold, model.model
            FROM modelSerial
            JOIN model ON modelSerial.model_id = model.model_id
            WHERE modelSerial.SN = ?`,
           [snId]
        );
        console.log(snId)
        if (checkExistModel.length === 0) {
            return new Response(
                JSON.stringify({
                    message: `SN ${snId} does not exist`,
                }),
                { status: 400 }
            );
        }
        console.log("Existmodel", checkExistModel)
        if (checkExistModel[0].model !== InsertModelName) {
            return new Response(
                JSON.stringify({
                    message: `SN ${snId} does not match the model ${InsertModelName}`,
                }),
                { status: 400 }
            );
        }
        

        // Check is sold
        const [check_is_sold] = await conn.query(
            "SELECT is_sold FROM modelSerial WHERE SN = ?",
            [snId]
         );
         console.log('check sold', check_is_sold)
         if (check_is_sold[0].is_sold === 1) {
            return new Response(
                JSON.stringify({
                    message: `This SN is already soldout`,
                }),
                { status: 400 }
            );
        }
        
        //SN is exist and has sold
        const [results] = await conn.query(
            "INSERT INTO installData SET ?",
             DataRecieve
          );

          await conn.query(
            "UPDATE modelSerial SET is_sold = true WHERE SN = ?",
            [snId]
        );

         
        return new Response (
            JSON.stringify(
                {
                    message: "insert data success",
                    results
                },
            )
        )
    } catch (error) {
        console.error("error", error.data);
        return new Response(JSON.stringify({ message: "insert data failed", error }));
    }
}
