import { Button } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DetailDataService } from '../redux/models';
import { changeDataServiceStatus } from '../redux/services/api';
import Loading from '../../../components/Loading';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';

interface OverviewProps {
  detail?: DetailDataService;
  id: string;
  reloadData: Function;
}

export default function Overview(props: OverviewProps) {
  const { detail, id, reloadData } = props;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(detail?.status || '0');

  const reloadData2 = (value: string) => {
    setStatus(value);
  };

  const onClickChangeStatus = (e: any) => {
    setLoading(true);
    changeDataServiceStatus(id)
      .then(rs => {
        setLoading(false);
        if (rs.code == 0) {
          if (status == '1') {
            NotificationSuccess('Thành công', 'Ngắt kết nối dịch vụ dữ liệu thành công');
            // reloadData();
            reloadData2('0');
          } else {
            NotificationSuccess('Thành công', 'Kết nối dịch vụ dữ liệu thành công');
            reloadData2('1');
          }
        } else {
          NotificationError('Thất bại', rs.message);
        }
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
      });
  };

  return (
    <Wrapper>
      <div className="header">
        <h3>
          Tổng quan
          <Link to={`/manager-data-services/manager-data-services/update/${id}`}>
            <Button icon="edit" className="buttonLink" />
          </Link>
        </h3>
        <h3>Thời gian chỉnh sửa lần cuối: {detail?.lastUpdate}</h3>
      </div>

      <div className="infomation">
        <ul>
          <li>Thông tin chung</li>
          <li>Tên dịch vụ: {detail?.name}</li>
          <StyledDescrip>
            <div>
              <li>Mô tả:</li>
            </div>
            <div style={{ whiteSpace: 'pre' }}>{detail?.description}</div>
          </StyledDescrip>

          <li>Người tạo: {detail?.createBy}</li>
          <li>Thời gian tạo: {detail?.time}</li>
        </ul>
      </div>

      <div className="containerOverview">
        <div className="containerOverview_col ">
          <ul>
            <li>EndPoint</li>
            <li>{detail?.httpEndpoint}</li>
            <li>{detail?.httpsEndpoint}</li>
          </ul>
        </div>
        <div className="containerOverview_col ">
          <ul>
            <li>Trạng thái</li>
            <li>
              {status == '1' ? (
                <span style={{ color: 'green' }}>Hoạt động</span>
              ) : (
                <span style={{ color: 'red' }}>Không hoạt động</span>
              )}

              <span>
                {status == '1' ? (
                  <Button className="btnStatus" onClick={onClickChangeStatus}>
                    Ngắt kết nối
                  </Button>
                ) : (
                  <Button className="btnStatus" onClick={onClickChangeStatus}>
                    Kết nối
                  </Button>
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {loading ? <Loading /> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .buttonLink {
      border: none;
      background-color: transparent;
      box-shadow: none;
      font-size: 20px;
      margin-left: 5px;
    }

    & > h3 {
      font-weight: bold;
      color: #232323;

      & > button {
        margin-left: 16px;
        color: inherit;
        border: none;
        box-shadow: none;

        font-size: 20px;

        &:hover {
          opacity: 0.6;
        }
      }
    }

    .p {
      color: #232323;
    }
  }

  .infomation {
    margin-top: 16px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0px 7px 20px 7px;
      /* font-size: 22px;
      line-height: 24px; */
    }

    li:first-of-type {
      padding-top: 13px;
      font-weight: bold;
    }
  }

  .containerOverview {
    padding: 30px 0px 0px;
    display: flex;
    justify-content: space-between;

    &_col {
      width: 49%;
      height: 150px;
      background-color: #fff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .status {
      /* font-size: 24px;
      line-height: 28px; */
      color: #55de32;
    }

    .btnStatus {
      color: #315dfa;
      box-shadow: none;

      /* border: none; */
      margin-left: 25px;
    }
  }
`;
const StyledDescrip = styled.div`
  margin-top: -15px;
  margin-bottom: 15px;
  display: flex;
  align-items: baseline;
`;
