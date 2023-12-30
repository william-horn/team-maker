
import Foobar from "./model";
import connectMongoDB from "@/lib/db/mongodb-connect";

export { Foobar }

export async function getAll() {
  "use server";

  console.log("before DB connect in getAll(): ");
  await connectMongoDB();
  console.log("after DB connect in getAll()");
  
  const data = await Foobar.find();
  console.log("getAll() fetch return: ", data);
  
  return data;
}

export default {
  getAll
}