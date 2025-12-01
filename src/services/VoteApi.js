import { GetReq, PostReq } from "../helpers/apiHelper";

/*
curl https://localhost:7071/api/Vote/vote \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "vote_id": null,
  "post_id": null,
  "user_id": null,
  "comment_id": null,
  "is_upvote": true,
  "created_at": null
}'
*/
async function voteApi(data) {
  console.log("from vote api: ", data);
  return await PostReq(`https://localhost:7071/api/Vote/vote`, data);
}
/*curl 'https://localhost:7071/api/Vote/user?user_id=' */
async function getCurrUserVote(user_id) {
  return await GetReq(
    `https://localhost:7071/api/Vote/user?user_id=${user_id}}`
  );
}
export { voteApi, getCurrUserVote };
