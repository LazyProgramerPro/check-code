import MyService from "../service";

const PostsApi = {
  getAllPosts: async (params) => {
    let result;
    try {
      result = await MyService.getRequest(`/posts`, params);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },

  getPostDetail: async (params) => {
    let result;
    try {
      result = await MyService.getRequest(`/posts/${params.slug}`, params);
      return result.data;
    } catch (error) {
      console.log(error);
    }

  },

  searchPost: async (params) => {
    let result;
    try {
      result = await MyService.postRequest(`/posts/search`, params);
      return result.data;
    } catch (error) {
      console.log(error);
    }

  },
};

export default PostsApi;
