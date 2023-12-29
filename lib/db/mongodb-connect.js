import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (cached.conn) {
    console.log("returning CACHED mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      const DEV = process.env.NODE_ENV === "development";

      // mongoose.set("strictQuery", false);

      console.log(DEV ? "LOCAL SERVER: " : "PRODUCTION: ");
      console.log("MONGODB_URI: ", process.env.MONGODB_URI);

      cached.promise = mongoose.connect(
        DEV 
          ? "mongodb://localhost/raven-dev" 
          : process.env.MONGODB_URI
        )
        .then(mongoose => mongoose);

    } catch(error) {

      console.log("DATABASE ERROR: ", error);
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;
