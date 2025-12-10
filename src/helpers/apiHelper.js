import axios from "axios";

export async function DeleteReq(apiUrl, data = {}, content_type) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.delete(apiUrl, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": content_type,
      },
      data: data,
    });

    return res.data;
  } catch (err) {
    const errorData = err.response?.data;

    const backendMsg =
      errorData?.error ||
      errorData?.msg ||
      errorData?.message ||
      err.message ||
      "Unknown error";

    throw backendMsg;
  }
}

export async function PostReq(apiUrl, data) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(apiUrl, data, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return res.data;
  } catch (err) {
    const errorData = err.response?.data;

    const backendMsg =
      errorData?.error ||
      errorData?.msg ||
      errorData?.message ||
      err.message ||
      "Unknown error";

    throw backendMsg;
  }
}
export async function PutReq(apiUrl, data, content_type) {
  const options = {
    method: "PUT",
    url: apiUrl,
    headers: {
      "Content-Type": content_type ?? "multipart/form-data",
    },
    data: data,
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export async function GetReq(apiUrl) {
  try {
    const res = await axios.get(apiUrl);
    return res.data;
  } catch (err) {
    console.error("GetReq error:", err.message);
    const backendMsg = err.response?.data?.msg;
    throw backendMsg || err.message || "Unknown error";
  }
}
