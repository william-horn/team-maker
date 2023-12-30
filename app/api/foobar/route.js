import connectMongoDB from "@/lib/db/mongodb-connect";
import { NextResponse } from "next/server";
import { escapeRegex } from "@/lib/utils/escapeRegex";

import Foobar from "@/models/foobar/model";

export async function GET(req) {
  try {
    // get '?key=value' / '&key=value' syntax:
    // const queryParams = req.nextUrl.get('');
    await connectMongoDB();
    const foobarData = await Foobar.find();

    return NextResponse.json({
      data: foobarData,
    }, { status: 200 });

  } catch(error) {
    console.log("Server error: ", error);

    return NextResponse.json({
      message: "Server error: " + error,
    }, { status: 500 })
  } 
}
