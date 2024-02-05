import client from "./connect.service";
const db = client.db(process.env.MONGO_DB_NAME);

export default db;