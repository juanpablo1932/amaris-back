import "dotenv/config";
import { connect } from "mongoose";

async function connectMongo(): Promise<void> {
  const MONGO_URI = <string>process.env.MONGO_URI;
  await connect(MONGO_URI);
}

export default connectMongo;
