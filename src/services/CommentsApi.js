import { PostReq } from "../helpers/apiHelper";

async function postCommentApi(commentData) {
  console.log(commentData);
  return await PostReq(
    "https://localhost:7071/api/Comment/create",
    commentData
  );
}

export { postCommentApi };
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
