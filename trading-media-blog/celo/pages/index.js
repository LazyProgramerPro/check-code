import useTranslation from "next-translate/useTranslation";
import React from "react";
import CategoryApi from "../api/category/CategoryApi";
import PostsApi from "../api/posts/PostsApi";
import Carousel from "../components/carousel/Carousel";
import Footer1 from "../components/footer/Footer";
import HomeLayout from "../components/layout/home";
import Section from "../components/section/Section";
import Head from "next/head";

const Home = ({ news, dataTopNew, sections }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Byte Buffer</title>
        <meta content="description" name="description"></meta>
      </Head>
      <HomeLayout>
        <div className="layout-content">
          <Carousel news={news} dataTopNew={dataTopNew} />
          {sections.map((section) => (
            <Section section={section} title={section.name} />
          ))}
        </div>
        <Footer1 />
      </HomeLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;

  const paramsAllPosts = {
    page: query.page || 1,
    pageSize: query.pageSize || 10,
  };

  const { result } = await PostsApi.getAllPosts(paramsAllPosts);

  const paramsTopNew = {
    page: query.page || 1,
    pageSize: 5,
    orderBy: "view",
    orderType: "DESC",
  };
  const dataTopNew = await PostsApi.getAllPosts(paramsTopNew);

  const section = await CategoryApi.getCategoryInSection();

  return {
    props: {
      news: result,
      dataTopNew: dataTopNew.result,
      sections: section?.result,
    },
  };
}

export default Home;
