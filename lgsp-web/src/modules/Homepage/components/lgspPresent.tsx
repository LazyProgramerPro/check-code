import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import styled from 'styled-components';
const View = styled.div`
  .lgsp-detail--1 {
    font-style: normal;
    font-weight: normal;
    margin-bottom: 35px;
    line-height: 26px !important;
  }
  .lgsp-reg {
    /* padding: 0px 0px 16px !important; */
  }
  .lgsp-detail--1 {
    font-size: 17px !important;
  }
`;
export const LgspPresent = function() {
  const selectHomePageState = useAppSelector(state => state.mainPage.homePage.data);

  return (
    <View>
      <div className="lgsp-present">
        <div className="lgsp-present--text white-text">
          <h2>GIỚI THIỆU LGSP</h2>
          <div className="lgsp-detail--1">
            <div dangerouslySetInnerHTML={{ __html: selectHomePageState?.introduction as string }} />
          </div>
          <div className="lgsp-reg">
            <Link to="/register">
              <button className="lgsp-reg-btn">ĐĂNG KÝ KẾT NỐI</button>
            </Link>
          </div>
        </div>
      </div>
    </View>
  );
};

export default LgspPresent;
