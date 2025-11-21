import { PostReq } from "../helpers/apiHelper";


async function loginApi(formData) {
  try {
     return  await PostReq("https://localhost:7071/api/Auth/login",formData);
 ;
  } catch (error) {
    console.log(error);
  }
}

async function registerApi(formData) {
  try {
    return await PostReq("https://localhost:7071/api/Auth/signup",formData);

  } catch (error) {
    console.log(error);
  }
}

async function logoutApi(formData) {
  try {
     return  await PostReq("https://localhost:7071/api/Auth/logout",formData);
  } catch (error) {
    console.log(error);
  }
}

export { loginApi,registerApi,logoutApi };
