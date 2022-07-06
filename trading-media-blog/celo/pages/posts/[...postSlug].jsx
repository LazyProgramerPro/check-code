import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import PostsApi from "../../api/posts/PostsApi";
import Head from "next/head";
import HomeLayout from "../../components/layout/home";
import ContentRight, {
  ContentRightItem,
} from "../../components/carousel/ContentRight";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper";
import { EyeOutlined } from "@ant-design/icons";
import Footer1 from "../../components/footer/Footer";
import ListPost from "../../components/post/ListPost";
import CategoryApi from "../../api/category/CategoryApi";
import { Button } from "antd";
import { useRouter } from "next/router";
import Comment from "../../components/comment/Comment";
import moment from "moment";
import avatar from "../../assets/logo.png";
import Image from "next/image";
import CustomImage from "../../components/image/CustomImage";
import { API_IMAGE_URL } from "../../constants/common";
import useTranslation from "next-translate/useTranslation";

const PostDetail = ({ post, dataTopView, relatedPost }) => {
  const { t } = useTranslation("common");
  const [headingArray, setHeadingArray] = useState([]);
  const [h3Heading, setH3Heading] = useState([]);
  const router = useRouter();

  const arr = post.keyword.split(",").map((k) => {
    return k.trim();
  });

  useEffect(() => {
    let array = [];
    const content = document.getElementById("content").querySelectorAll("h3");
    const h3 = Array.prototype.slice.call(content);
    h3.forEach((item, index) => {
      item.outerHTML = "<h2>" + item.innerHTML + "</h2>";
    });
    h3.map((item) => {
      array.push(item.innerText);
    });
    setH3Heading(array);

    let indexArray = [];
    const getHeading = document
      .getElementById("content")
      .querySelectorAll("h2");
    const allh2 = Array.prototype.slice.call(getHeading);
    allh2.map((headding, index) => {
      headding.setAttribute("id", `heading${index}`);
    });
    allh2.map((item) => {
      indexArray.push(item.innerText);
    });
    setHeadingArray(indexArray);
  }, [post]);

  useEffect(() => {
    const getHeading = document
      .getElementById("content")
      .querySelectorAll("h2");
    const a = Array.prototype.slice.call(getHeading);
    h3Heading.forEach((h) => {
      a.forEach((item, index) => {
        if (h == item.innerText) {
          item.outerHTML =
            `<h3 id='heading${index}'>` + item.innerText + "</h3>";
        }
      });
    });
  }, [post]);

  const custom = (heading) => {
    let classCustom = "";
    h3Heading.forEach((h) => {
      if (h == heading) {
        classCustom += "custom";
      }
    });
    return classCustom;
  };

  const handleScroll = (index) => {
    let element = document.getElementById(`heading${index}`);
    window.scrollTo({
      top: element.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (i) => {
    router.push({
      pathname: "/search",
      query: { searchParams: i },
    });
  };

  return (
    <HomeLayout title={post.title}>
      <div className="post">
        <div className="post-detail">
          <div className="post-detail-left">
            <div className="post-detail-left-heading">
              <ol className="post-detail-left-heading-list" id="index-list">
                {headingArray.map((heading, index) => (
                  <li className={custom(heading)}>
                    <div
                      className="post-detail-left-heading-list--item"
                      onClick={() => {
                        handleScroll(index);
                      }}
                    >
                      {heading}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="post-detail-left-keyword">
              <div className="post-detail-left-keyword--title">
                {t("keyword")}
              </div>
              <div className="post-detail-left-keyword-list">
                {arr.filter(Boolean).map((i) => (
                  <div className="post-detail-left-keyword-list--item">
                    <div onClick={() => handleSearch(i)}>{i}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="post-detail-middle">
            <div className="post-detail-middle-article">
              <Head>
                <title>{post.title}</title>
                <meta content={post.description} name="description"></meta>
                <meta content={post.keyword} name="keywords"></meta>
                <meta
                  content={post.description}
                  property="og:description"
                ></meta>
                <meta
                  content={post.description}
                  property="twitter:description"
                ></meta>
              </Head>
              <h1>{post.title}</h1>
              <div className="post-detail-middle-article-info">
                <div className="post-detail-middle-article-info-left">
                  <div className="post-detail-middle-article-info-left--author">
                    {post.author}
                  </div>
                  <div className="post-detail-middle-article-info-left--time">
                    {moment(post.createdAt).format("MM/DD/YYYY")} |{" "}
                    {moment(post.createdAt).format("h:mm a")}
                  </div>
                  <div className="post-detail-middle-article-info-left--keyword">
                    {arr.filter(Boolean).map((i) => (
                      <div className="post-detail-middle-article-info-left--keyword__item">
                        <div onClick={() => handleSearch(i)}>{i}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="post-detail-middle-article-info-right">
                  <div className="post-detail-middle-article-info-right--view">
                    <EyeOutlined />
                    {post.view > 1000
                      ? `${(post.view / 1000).toFixed()} K`
                      : post.view}
                  </div>
                </div>
              </div>
              <div className="post-detail-middle-article-thumbnail">
                <CustomImage src={post.thumbnails[0]} />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="post-detail-middle-article--content"
                id="content"
              ></div>
            </div>
            <div className="post-detail-middle-author">
              <div className="post-detail-middle-author--avatar">
                <Image
                  src={avatar}
                  alt=""
                  className="post-detail-middle-author--avatar"
                />
              </div>
              <div className="post-detail-middle-author--info">
                <div className="post-detail-middle-author--info__name">
                  Admin
                </div>
                <div className="post-detail-middle-author--info__caption">
                  Hãy là một nhà đầu tư thông thái
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="post-detail-right">
          <div className="post-detail-right-top">
            <div className="post-detail-right-top--title">
              {t("related_post")}
            </div>
            {relatedPost.length < 5 ? (
              <ContentRight data={relatedPost} />
            ) : (
              <div className="post-detail-right-top--swiper">
                <Swiper
                  direction={"vertical"}
                  slidesPerView={5}
                  spaceBetween={0}
                  mousewheel={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  modules={[Mousewheel, Autoplay]}
                >
                  {[...relatedPost].map((item) => (
                    <SwiperSlide>
                      <ContentRightItem item={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="most-view-post">
        <ListPost data={dataTopView} title={t("most_popular")} />
      </div>
      <div className="comment">
        <Comment />
      </div>
      <Footer1 />
    </HomeLayout>
  );
};

export default PostDetail;

export async function getServerSideProps(context) {
  const { params, res, locale } = context;
  const payload = {
    slug: params.postSlug,
    lang: locale,
  };
  const { result } = await PostsApi.getPostDetail(payload);

  if (!result) {
    res.statusCode = 404;
  }

  const paramsTopView = {
    page: 1,
    pageSize: 6,
    orderBy: "view",
    orderType: "DESC",
    lang: locale,
  };
  const dataTopView = await PostsApi.getAllPosts(paramsTopView);

  const relatedPost = await CategoryApi.getNewsByCategorySlug(
    result?.categories[0]?.slug,
    1,
    10,
    locale
  );

  return {
    props: {
      post: result,
      dataTopView: dataTopView?.result || [],
      relatedPost: relatedPost?.result || [],
    },
  };
}
