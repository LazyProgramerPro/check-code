import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";
import PostsApi from "../../api/posts/PostsApi";
import Footer1 from "../../components/footer/Footer";
import HomeLayout from "../../components/layout/home";
import ListPost from "../../components/post/ListPost";


const SearchPost = ({ post, category = null, keyword }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <HomeLayout category={category}>
        <ListPost data={post} title={`${t("result")} "${keyword}"`} />
        <Footer1 />
      </HomeLayout>
    </>
  );
};

export default SearchPost;

export async function getServerSideProps(context) {
  const { query } = context;

  const queryParams = {
    page: 1,
    pageSize: 10,
    keyword: query?.searchParams,
  };

  const { result } = await PostsApi.searchPost(queryParams);
  return {
    props: {
      post: result,
      keyword: queryParams?.keyword,
    },
  };
}
