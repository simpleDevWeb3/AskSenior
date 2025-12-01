import { GetReq } from "../helpers/apiHelper";
//curl https://localhost:7071/api/Community

async function getAllCommunityApi() {
  return await GetReq(`https://localhost:7071/api/Community`);
}

//curl 'https://localhost:7071/api/Community/{id}'
async function getCommunityApi(id) {
  return await GetReq(`https://localhost:7071/api/Community/${id}`);
}
export { getAllCommunityApi, getCommunityApi };
