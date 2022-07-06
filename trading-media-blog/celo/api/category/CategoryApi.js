import MyService from   "../service";

const CategoryApi = {
  getAllCategory: async (page, pageSize, lang) => {
    try {
      const { data } = await MyService.getRequest(`/categories`, {
        page,
        pageSize,
        lang,
      });

      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },

  getNewsByCategorySlug: async (slug, page, pageSize, lang) => {
    try {
      const { data } = await MyService.getRequest(`/categories/${slug}/posts`, {
        page,
        pageSize,
        slug,
        lang
      });
      return data;
    } catch (error) {
      return {};
    }
  },

  getCategoryInSection: async () => {
    try {
      const { data } = await MyService.getRequest(`/setting`);
      return data;
    } catch (error) {
      return {};
    }
  }
};

export default CategoryApi;
