import { GetReq, PostReq } from "../helpers/apiHelper";
//curl 'https://localhost:7071/api/Comment/user?userId=null&postId=null'
async function getUserCommentApi(user_id) {
  return await GetReq(
    `https://localhost:7071/api/Comment/user?userId=${user_id}&postId=null`
  );
}
async function postCommentApi(commentData) {
  console.log(commentData);
  return await PostReq(
    "https://localhost:7071/api/Comment/create",
    commentData
  );
}

export { postCommentApi, getUserCommentApi };
/*
curl https://localhost:7071/api/Comment/create \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "postId": "",
  "userId": "",
  "parentId": null,
  "content": ""
}'

*/
