import { DeleteReq, GetReq, PostReq, PutReq } from "../helpers/apiHelper";

/*curl 'https://localhost:7071/api/Post/deletePost/{post_id}' \
  --request DELETE */

async function deletePostApi(post_id) {
  console.log("post_id delete: ", post_id);
  return await DeleteReq(
    `https://localhost:7071/api/Post/deletePost/${post_id}`
  );
}
/**
 * curl 'https://localhost:7071/api/Post/editPost/{post_id}' \
  --request PUT \
  --header 'Content-Type: multipart/form-data' \
  --form 'topic_id=' \
  --form 'community_id=' \
  --form 'title=' \
  --form 'text=' \
  --form 'original_image_id=' \
  --form 'new_image='
 */

async function editPostApi(data) {
  const formData = new FormData();

  // 1. Append Simple Text Fields
  formData.append("topic_id", data?.topic_id);
  formData.append("community_id", data?.community_id);
  formData.append("title", data?.title);
  formData.append("text", data?.text);

  // Append each item one by one.
  if (data?.original_image_id && Array.isArray(data.original_image_id)) {
    data.original_image_id.forEach((id) => {
      formData.append("original_image_id", id);
    });
  }

  if (data?.new_image && Array.isArray(data.new_image)) {
    data.new_image.forEach((file) => {
      formData.append("new_image", file);
    });
  }

  await PutReq(
    `https://localhost:7071/api/Post/editPost/${data.post_id}`,
    formData
  );
}

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
/*
curl https://localhost:7071/api/Post/banPost \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "post_id": null,
  "reason": ""
}' */

async function banPostApi(data) {
  const formatedData = {
    post_id: data?.post_id,
    reason: data?.reason,
  };
  return await PostReq(`https://localhost:7071/api/Post/banPost`, formatedData);
}
/**
 * curl 'https://localhost:7071/api/Post/getAllPostsAdmin?current_user=null&user_id=null&post_title=null&post_id=null&community_id=null'
 */

async function getAllPostAdminApi() {
  return await GetReq(
    `https://localhost:7071/api/Post/getAllPostsAdmin?current_user=null&user_id=null&post_title=null&post_id=null&community_id=null`
  );
}
export {
  createPostApi,
  getAllPostApi,
  getPostCommentsApi,
  searchPostApi,
  getPostByVote,
  editPostApi,
  deletePostApi,
  banPostApi,
  getAllPostAdminApi,
};
