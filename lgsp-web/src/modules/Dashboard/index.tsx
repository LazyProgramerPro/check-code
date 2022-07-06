import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import styled from 'styled-components';
import {RootState} from 'src/redux/reducers';
import {Row} from 'antd';
import env from "../../configs/env";

const mapStateToProps = (rootState: RootState) => ({
  // statisticByMonth: rootState.dashboard.statisticByMonth,
  // listTimesheetByMonth: rootState.dashboard.listTimesheetByMonth,
  // listAttendanceByMonth: rootState.dashboard.listAttendanceByMonth,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Dashboard = ({}: PropsFromRedux) => {

  const currentTime = Date.now();
  const [selectedTime, setSelectedTime] = React.useState(currentTime); // time to get report;
  const [departmentId, setDepartmentId] = useState('');

  useEffect(() => {
    document.title = env.pageTitle + 'Dashboard';
  }, []);

  return (
    <>

    </>

  );
};

const Wrapper = styled.div.attrs({
  className: 'contentPage',
})`
  padding-top: 0 !important;
`;

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

export default connector(Dashboard);
