import axios from "axios";

async function PostReq(apiUrl,data){
  
     const res = await axios.post(`${apiUrl}`, 
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const apiData = await res.json();

    return apiData;
}

export {PostReq};