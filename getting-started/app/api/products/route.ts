import { NextRequest, NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';




export async function GET(req : NextRequest){
    const db = neon(`${process.env.DATABASE_URL}`);

    const sql = `CREATE TABLE IF NOT EXISTS Products (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            price NUMERIC(10, 2) NOT NULL,
            quantity INT DEFAULT 0
        );`;

    const getRecordsSql = `SELECT * FROM Products LIMIT 200;`


    try{
        await db(sql);
        const records = await db(getRecordsSql);
        return NextResponse.json({'message' : 'success','records':records});

    }catch(e:any){
        return NextResponse.json({'message' : 'error', 'error': e.message}, { status: 500 });
    }

}

export async function POST(req : NextRequest){
    const db = neon(`${process.env.DATABASE_URL}`);

    const {name,description,price,quantity} = await req.json();
    const insertSql = `INSERT INTO Products (name,description,price,quantity) VALUES ('${name}','${description}',${price},${quantity}) RETURNING *;`;
    try{
        const response = await db(insertSql);
        return NextResponse.json({"message":response});

    }catch(e:any){
        return NextResponse.json({"error":e.message},{status:400});
    }
}
