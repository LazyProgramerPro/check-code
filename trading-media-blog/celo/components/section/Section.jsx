import { Card, Col, Row } from "antd";
import { isEmpty } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoryApi from "../../api/category/CategoryApi";
import PostsApi from "../../api/posts/PostsApi";
import { API_IMAGE_URL } from "../../constants/common";
import CustomImage from "../image/CustomImage";

const { Meta } = Card;

const TYPE = {
  NEW_POST: "newest_posts",
  TOP_VIEW_POST: "top_view_posts",
};

function Section({ section, title }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (isEmpty(section.categories)) {
      let params = {
        page: 1,
        pageSize: 6,
        lang: router.locale,
        orderType: "DESC",
      };

      if (section.key === TYPE.NEW_POST) {
        params.orderBy = "createAt";
      } else {
        params.orderBy = "view";
      }
      PostsApi.getAllPosts(params).then((result) => {
        setData(result?.result);
      });
    } else {
      let array = [];

      section.categories.forEach((c) => {
        CategoryApi.getNewsByCategorySlug(c.slug, 1, 6, "vn").then((result) => {
          array = [...result.result];
          setData(array);
        });
      });
    }
  }, []);

  return (
    <>
      {!section.enable ? (
        ""
      ) : (
        <div id="feature" className="list" style={{ color: "red" }}>
          <div className="list-container">
            <div className="list-container--title">
              {!isEmpty(title) && <h2>{title}</h2>}
            </div>
            <Row gutter={[24, 24]} className="list-container--card">
              {!isEmpty(data) ? (
                data.map((d) => {
                  return (
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
                      <Link href={`/posts/${d.slug}`}>
                        <a>
                          <Card
                            className="card-content"
                            hoverable
                            cover={
                              <div className="card-content--image">
                                <CustomImage src={d.thumbnails[0]} />
                              </div>
                            }
                          >
                            <Meta
                              className="card-content--title"
                              title={d.title}
                            />
                            <div className="card-content--body">
                              <div>
                                {t("author")}: {d.author}{" "}
                              </div>
                              <div>
                                {t("view")}: {d.view}{" "}
                              </div>
                            </div>
                          </Card>
                        </a>
                      </Link>
                    </Col>
                  );
                })
              ) : (
                <div className="empty-data">{t("no_post")}</div>
              )}
            </Row>
          </div>
        </div>
      )}
    </>
  );
}

export default Section;
