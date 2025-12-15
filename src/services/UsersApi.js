//curl 'https://localhost:7071/api/Auth/searchUser?username='

import { GetReq, PostReq } from "../helpers/apiHelper";

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
//curl https://localhost:7071/api/Auth/AllUser
async function getAllUserApi() {
  return await GetReq(`https://localhost:7071/api/Auth/AllUser`);
}

/**
 *curl https://localhost:7071/api/Auth/banUser \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "user_id": null,
  "reason": ""
}'
 */

async function banUserApi(data) {
  const formatData = {
    user_id: data?.user_id,
    reason: data?.reason,
  };
  return await PostReq(`https://localhost:7071/api/Auth/banUser`, formatData);
}



export { searchUserApi, getUserApi, getAllUserApi, banUserApi };
