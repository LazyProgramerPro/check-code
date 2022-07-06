import React from 'react';
import PageTitle from "./PageTitle";
import { Layout } from 'antd';
const { Content } = Layout;

interface LayoutProps {
    title?: string;
    children?: React.ReactNode;
}

const PageContainer = (props: LayoutProps) => {
    return (
        <div>
            <PageTitle>
                <h3>{props.title}</h3>
            </PageTitle>

            <Content>
                {props.children}
            </Content>
        </div>
    );
};
export default PageContainer;
