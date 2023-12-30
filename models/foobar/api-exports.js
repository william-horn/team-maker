"use server";

import connectMongoDB from "@/lib/db/mongodb-connect";
/*
  Inside files that export fetch functions for client-side use, such as this one, we
  must have 'use server' at the top of the document. These files must EXCLUSIVELY export
  strictly async functions, and nothing else.
*/

// * if we haven't created an api elsewhere already, then import manually:
// import Foobar from "./model";
// import connectMongoDB from "@/lib/db/mongodb-connect";

import FoobarAPI, { Foobar } from "./api";
import { escapeRegex } from "@/lib/utils/escapeRegex";

export async function getAll(args={}) {
  const data = await FoobarAPI.getAll(args);
  return data;
}

function callToJSON(dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i];
    dataArray[i] = v.toJSON();
    dataArray[i]._id = v._id.toJSON();
  }

  return dataArray;
}

export async function getAllExcept(limit, exclude, queryStr) {
  await connectMongoDB();

  if (exclude.length === 0) {
    exclude = [{ name: '' }];
  } else {
    exclude = exclude.map(v => ({ name: v }));
  }

  const data = await Foobar.find({
    $nor: exclude,
    $and: [ { name: {"$regex": escapeRegex(queryStr), "$options": "i"}} ]
  })
  .limit(limit);

  // simulated delay
  await new Promise(r => setTimeout(r, 2000));

  return callToJSON(data);
}

