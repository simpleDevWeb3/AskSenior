import { GetReq, PostReq } from "../helpers/apiHelper";
/**curl 'https://localhost:7071/api/Post/getPost?current_user=null&user_id=null&post_title=null&post_id=null&community_id=null&page=1&pageSize=10' */
async function getAllPostApi(
  user_id,
  page = 1,
  pageSize = 3,
  currentUserId = null
) {
  console.log(user_id ? user_id : null);
  return await GetReq(
    `https://localhost:7071/api/Post/getPost?user_id=${
      user_id ? user_id : null
    }&post_title=null&post_id=null&page=${page}&pageSize=${pageSize}&current_user=${currentUserId}`
  );
}
async function createPostApi(postData) {
  const fd = new FormData();
  fd.append("user_id", postData?.user_id);
  fd.append("topic_id", postData?.topic_id);
  fd.append("community_id", postData?.community_id);
  fd.append("title", postData?.title);
  fd.append("text", postData?.text);

  if (postData?.image && !Array.isArray(postData.image))
    fd.append("image", postData?.image);

  if (postData?.image && Array.isArray(postData.image)) {
    postData.image.forEach((file) => {
      fd.append("image", file);
    });
  }
  try {
    return await PostReq("https://localhost:7071/api/Post/createPost", fd);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getPostCommentsApi(post_id, currentUserId) {
  console.log("post_id url: ", post_id);
  console.log("API Function CALLED with:", post_id);
  return await GetReq(
    `https://localhost:7071/api/Post/getPost?user_id=null&post_title=null&post_id=${post_id}&page=1&pageSize=10&current_user=${currentUserId}`
  );
}

/**
 * curl 'https://localhost:7071/api/Post/getPost?current_user=null&user_id=null&post_title=null&post_id=null&community_id=null&page=1&pageSize=10'
 */

async function searchPostApi(current_user, postTitle, page = 1) {
  return await GetReq(`https://localhost:7071/api/Post/getPost?current_user=${current_user}&user_id=null&post_title=${postTitle}&post_id=null&community_id=null&page=${page}&pageSize=3
  `);
}
//curl https://localhost:7071/api/Vote/all_Voted?user_id=&vote_type=true'
async function getPostByVote(user_id, vote_type) {
  return await GetReq(
    `https://localhost:7071/api/Vote/all_Voted?user_id=${user_id}&vote_type=${vote_type}`
  );
}

export {
  createPostApi,
  getAllPostApi,
  getPostCommentsApi,
  searchPostApi,
  getPostByVote,
};
