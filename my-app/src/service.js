import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";
// listing data
export const getPosts = async (endpoint) => {
  try {
    const response = await axios.get(BASE_URL + endpoint); 
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

//adding data
export const createPost = async (endpoint,postData) => {
  try {
    const response = await axios.post(BASE_URL+endpoint, postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

  //updating data
  export const editPost = async (endpoint,putData) => {
    try{
      const response = await axios.put(BASE_URL + endpoint, putData);;
      return response.data;
    }catch (error) {
      console.error("Error updating data",error);
      throw ErrorEvent;
    }
  };

