
import Foobar from "./model";
import connectMongoDB from "@/lib/db/mongodb-connect";

export { Foobar }

/*
  Example of converting a specific object of this structure:

  [
    { _id: ObjectId('jf98y340293u98d7723'), ... },
    { _id: ObjectId('skljdhf7h2oas989873'), ... },
    ...
  ]

  into this formatted structure, capable of being passed to the client component:

  [
    { _id: 'jf98y340293u98d7723', ... },
    { _id: 'skljdhf7h2oas989873', ... },
    ...
  ]
*/
function callToJSON(dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i];
    dataArray[i] = v.toJSON();
    dataArray[i]._id = v._id.toJSON();
  }

  return dataArray;
}

/*
  Example GET query
*/
export async function getAll({ 
  limit=1, 
  select='name' 
}) {
  /*
    Must declare 'use server', in case a client component attempts to run this query.
  */
  "use server";
  await connectMongoDB();
  
  /*
    ? note: 
    When this function is being called inside a client component, the data returned from 
    the database should ideally be re-formatted to exclude special objects that are 
    incompatible with being passed to the client, such as the _id field.

    These are some solutions I can use:
      - JSON.parse(JSON.stringify(data))

      - Clone all fields of the data into a new object:
      
      - Manually call 'toJSON()' on objects containing that method
        to manually convert them into a compatible format.
  */
  const data = await Foobar
    .find()
    .limit(limit)
    .select(select);

  // format the data to be passed to client components
  const formatted = callToJSON(data);

  return formatted;
}

export default {
  getAll
}