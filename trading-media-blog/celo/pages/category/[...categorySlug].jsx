import React from "react";
import CategoryApi from "../../api/category/CategoryApi";
import HomeLayout from "../../components/layout/home";
import ListPost from "../../components/post/ListPost";
import NotFound from "../404";

const PostDetail = ({ post, category, isNotFound }) => {
  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <>
      <HomeLayout title={category.title} category={category}>
        <ListPost data={post} title={category.title} />
      </HomeLayout>
    </>
  );
};

export default PostDetail;

export async function getServerSideProps(context) {
  const { params, res } = context;
  const { result, category } = await CategoryApi.getNewsByCategorySlug(
    params.categorySlug,
    1,
    20
  );

  if (!result || !category) {
    res.statusCode = 404;
  }

  return {
    props: {
      isNotFound: !result || !category,
      post: result || null,
      category: category || null,
    },
  };
}
