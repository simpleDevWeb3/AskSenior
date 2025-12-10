import { DeleteReq, GetReq, PostReq, PutReq } from "../helpers/apiHelper";
//curl 'https://localhost:7071/api/Comment/user?userId=null&postId=null'
async function getUserCommentApi(user_id) {
  return await GetReq(
    `https://localhost:7071/api/Comment/user?userId=${user_id}&postId=null`
  );
}
/*
curl https://localhost:7071/api/Comment/create \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "postId": "",
  "userId": "",
  "parentId": null,
  "content": ""
}'*/
async function postCommentApi(commentData) {
  console.log(commentData);
  return await PostReq(
    "https://localhost:7071/api/Comment/create",
    commentData
  );
}

/**
 * curl 'https://localhost:7071/api/Comment/edit/{commentId}' \
  --request PUT \
  --header 'Content-Type: application/json' \
  --data '{
  "comment_id": null,
  "user_id": null,
  "content": "",
  "parent_id": null
}'
 */
async function editCommentApi(comment_id, data) {
  const newData = {
    comment_id: comment_id,
    user_id: data?.user_id,
    content: data?.content,
    parent_id: data?.parent_id,
  };
  return await PutReq(
    `https://localhost:7071/api/Comment/edit/${comment_id}`,
    newData,
    "application/json"
  );
}
/*curl 'https://localhost:7071/api/Comment/delete/{commentId}' \
  --request DELETE \
  --header 'Content-Type: application/json' \
  --data '{
  "user_id": null
}' */
async function delCommentApi(comment_id, user_id, post_id) {
  console.log(comment_id, user_id, post_id);
  return await DeleteReq(
    `https://localhost:7071/api/Comment/delete/${comment_id}`,
    { user_id: user_id },
    "application/json"
  );
}

export { postCommentApi, getUserCommentApi, editCommentApi, delCommentApi };
