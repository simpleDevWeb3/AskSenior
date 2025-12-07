//curl 'https://localhost:7071/api/Auth/searchUser?username='

import { GetReq } from "../helpers/apiHelper";

async function searchUserApi(query) {
  return await GetReq(
    `https://localhost:7071/api/Auth/searchUser?username=${query}`
  );
}

//curl 'https://localhost:7071/api/Auth/getUserById?user_id='
async function getUserApi(user_id) {
  return await GetReq(
    `https://localhost:7071/api/Auth/getUserById?user_id=${user_id}`
  );
}

export { searchUserApi, getUserApi };
