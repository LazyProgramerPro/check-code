import React, { ReactNode } from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import styled from "styled-components";

interface IProps {
  title: string;
  extra?: ReactNode;
  breadcrumb?: BreadcrumbProps[];
}

export interface BreadcrumbProps {
  name: string;
  path?: string;
}

export const PageHeader = (props: IProps) => {
  const { title, extra, breadcrumb } = props;

  return (
    <StyledPageHeader className="page-header">
      <div className="page-header-heading">
        <div className="page-header-heading-left">
          <h1 className="page-header-heading-title">{title}</h1>
          {breadcrumb && (
            <Breadcrumb>
              {breadcrumb.map((item, index) => {
                const { name, path } = item;
                if (!path)
                  return (
                    <Breadcrumb.Item key={`breadcrumb_item_${index}`}>
                      {name}
                    </Breadcrumb.Item>
                  );
                return (
                  <Breadcrumb.Item key={`breadcrumb_item_${index}`}>
                    <Link href={path}>{name}</Link>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          )}
        </div>
        {extra && <div className="page-header-heading-extra">{extra}</div>}
      </div>
    </StyledPageHeader>
  );
};

const StyledPageHeader = styled.div`
  position: fixed;
  height: 90px;
  top: 0;
  right: 0;
  left: 200px;
  background: #fff;
  padding: 18px 20px;
  z-index: 1000;
  transition: all 0.2s;

  .page-header {
    &-heading {
      display: flex;
      justify-content: space-between;

      &-title {
        font-size: 20px;
        margin-bottom: 0;
      }

      &-left {
        .ant-breadcrumb {
          span {
            .ant-breadcrumb-link {
              color: rgba(149, 161, 172, 0.9);

              a {
                color: rgba(149, 161, 172, 0.9);
              }

              &:hover {
                color: $primary-color;
                a {
                  color: $primary-color;
                }
              }
            }

            &:last-child {
              .ant-breadcrumb-link,
              a {
                color: $primary-color;
              }
            }
          }
        }
      }

      &-extra {
        display: flex;
        align-items: center;
      }
    }
  }
`;
