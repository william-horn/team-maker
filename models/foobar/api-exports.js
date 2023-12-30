"use server";

/*
  Inside files that export fetch functions for client-side use, such as this one, we
  must have 'use server' at the top of the document. These files must EXCLUSIVELY export
  strictly async functions, and nothing else.
*/

// * if we haven't created an api elsewhere already, then import manually:
// import Foobar from "./model";
// import connectMongoDB from "@/lib/db/mongodb-connect";

import FoobarAPI, { Foobar } from "./api";

export async function getAll(args={}) {
  const data = await FoobarAPI.getAll(args);
  return data;
}

