
import Foobar from "./model";
import connectMongoDB from "@/lib/db/mongodb-connect";

export { Foobar }

export async function getAll() {
  "use server";
  await connectMongoDB();
  
  const data = await Foobar.find();
  
  return data;
}

export default {
  getAll
}