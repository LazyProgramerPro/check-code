import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

interface ITimeEdit {
  time: string;
}
const TimeEditItem = (props: ITimeEdit) => {
  const View = styled.div`
    margin-top: 10px;
    line-height: 20px;
  `;
  const { time } = props;
  return <View>{/* <div className="time-edit-item">Thời gian chỉnh sửa: {time}</div> */}</View>;
};

export default TimeEditItem;
