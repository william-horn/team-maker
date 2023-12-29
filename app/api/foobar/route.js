import connectMongoDB from "@/lib/db/mongodb-connect";
import { NextResponse } from "next/server";
import { escapeRegex } from "@/lib/utils/escapeRegex";

import Foobar from "@/models/foobars";

export async function GET(req) {
  try {
    // const params = req.nextUrl.get('');
    const foobarData = await Foobar.find();

    console.log("Got foobar data: ", foobarData);

    return NextResponse.json({
      data: foobarData,
    }, { status: 200 });

  } catch(error) {
    console.log("Server error: ", err);

    return NextResponse.json({
      message: "Server error: " + error,
    }, { status: 500 })
  } 
}
