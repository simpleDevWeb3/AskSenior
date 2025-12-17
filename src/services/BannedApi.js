import { GetReq } from "../helpers/apiHelper";

//curl 'https://localhost:7071/api/Community/banned?adminId='
async function getAllBannedApi(AdminId) {
  return await GetReq(
    `https://localhost:7071/api/Community/banned?adminId=${AdminId}`
  );
}
export { getAllBannedApi };
