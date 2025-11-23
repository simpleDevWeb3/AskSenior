import axios from "axios";

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
    console.error(err);
    const backendMsg = err.response?.data?.msg;
    throw backendMsg || err.message || "Unknown error";
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
