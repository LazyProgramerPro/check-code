import React from 'react';
import styled from 'styled-components';
import {Calendar, Popover, Tag} from 'antd';
import moment from 'moment';
import 'moment/locale/vi';

import {LOCALE_CONFIG} from './Constant';

import day from '../../assets/images/day.png';

const Timekeeping = (props: any) => {
  const {
    filters: {time, type},
  } = props;

  const dateCellRender = (value: any) => {
    return (
      <StyledPopover content={<Actions/>} trigger="click">
        <Cell>
          <Row>
            <span>{value.format('DD')}</span>
            <Label>THT</Label>
          </Row>
          {// The below code just for demo we will delete condition when intergrate with api
            moment().month() === value.month() && (
              <>
                <Row>
                <span>
                  {type === 'day' ? '1.0' : '8.0'} <img src={day} alt="day"/>
                </span>
                  <span>
                  0.5 <SmallLabel color="#1E87F0">P</SmallLabel>
                </span>
                </Row>
                <Row>
                  <Label color="#E8F9EA">7:10 - 18:30</Label>
                  <SmallLabel color="#E45356">M</SmallLabel>
                </Row>
              </>
            )}
        </Cell>
      </StyledPopover>
    );
  };

  const handleSelected = () => {
  };

  return (
    <StyledCalendar
      locale={LOCALE_CONFIG}
      value={time}
      headerRender={() => null}
      dateFullCellRender={dateCellRender}
      onSelect={handleSelected}
    />
  );
};

const Actions = () => {
  return (
    <ActionsWrapper>
      {/* <ActionItem>Đăng ký OT</ActionItem>
      <ActionItem>Đăng ký làm ngoài giờ</ActionItem>
      <ActionItem>Xin nghỉ phép</ActionItem> */}
    </ActionsWrapper>
  );
};

const StyledCalendar = styled(Calendar)`
  background-color: #fff;

  .ant-fullcalendar-calendar-body {
    padding: 0;
  }

  .ant-fullcalendar-column-header {
    padding: 15px 5px;
    text-align: center;
    background-color: #f2f2f2;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    .ant-fullcalendar-column-header-inner {
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  .ant-fullcalendar-cell {
    padding: 5px 10px;
    border-top: 1px solid #e8e8e8;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }
  }

  .ant-fullcalendar-next-month-btn-day,
  .ant-fullcalendar-last-month-cell {
    color: #dadada;
  }
`;

const Cell = styled.div`
  min-height: 77px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Label = styled(Tag)`
  margin: 0;
  color: #595959;
  border-radius: 2px;
  border: unset;
`;

const SmallLabel = styled(Label)`
  color: #fff;
  font-size: 10px;
  line-height: 10px;
  padding: 2px 3px;
`;

const StyledPopover = styled(({className, ...props}) => <Popover overlayClassName={className} {...props} />)`
  .ant-popover-inner-content {
    padding: 0;
  }
`;

const ActionsWrapper = styled.div``;

const ActionItem = styled.div`
  color: #000;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  &:last-child {
    border-top: 1px solid #e8e8e8;
  }
`;

export default Timekeeping;
