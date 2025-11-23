import { GetReq } from "../helpers/apiHelper";

export async function getTopicsApi() {
  try {
    const data = await GetReq("https://localhost:7071/api/Topic");
    return data;
  } catch (err) {
    console.error("Error fetching topics:", err.response?.data || err.message);
    throw err;
  }
}
