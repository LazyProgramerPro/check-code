import { Card, Col, Row } from "antd";
import { isEmpty } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { API_IMAGE_URL } from "../../constants/common";
import CustomImage from "../image/CustomImage";

const { Meta } = Card;

function ListPost({ data, title }) {
  const { t } = useTranslation("common");
  return (
    <div id="feature" className="list">
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
                        <Meta className="card-content--title" title={d.title} />
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
  );
}

export default ListPost;
