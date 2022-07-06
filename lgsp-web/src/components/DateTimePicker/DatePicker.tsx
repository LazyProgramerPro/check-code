import styled from 'styled-components';
import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import { DatePicker, Icon } from 'antd';
import { LOCALE_CONFIG } from './Constant';

const Cover = styled.div`
  flex-direction: row;
  flex: 1;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

const CoverIcon = styled(Icon)`
  margin: 5px 0px;
`;

const Date = styled.div`
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
`;

const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    const popupPicker = e.target.closest('.ant-calendar-picker-container');
    if (!popupPicker && ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export const DatePickerWrapper = (props: any) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const { onChange, selectedTime } = props; // selectedTime first day of week;

  const setLastDate = () => {
    const lastDate = moment(selectedTime).subtract(1, 'days');
    onChange(lastDate);
  };

  const setNextDate = () => {
    const nextDate = moment(selectedTime).add(1, 'days');
    onChange(nextDate);
  };

  const onSelectedDate = (date: any) => {
    onChange(moment(date));
    setShowDatePicker(false);
  };

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setShowDatePicker(false);
  });

  return (
    <Cover style={props.style || {}} ref={ref}>
      <DatePicker
        suffixIcon={<></>}
        locale={LOCALE_CONFIG}
        style={{ width: 0, overflow: 'hidden' }}
        popupStyle={{ paddingTop: 35, paddingLeft: 40 }}
        value={moment(selectedTime)}
        open={showDatePicker}
        onChange={onSelectedDate}
      />
      <Center>
        <CoverIcon type="left" onClick={setLastDate} />
        <Date onClick={() => setShowDatePicker(true)}>
          {moment(selectedTime)
            .lang('vi')
            .format('ddd, [ngày] DD [tháng] MM [năm] YYYY')}
        </Date>
        <CoverIcon type="right" onClick={setNextDate} />
      </Center>
    </Cover>
  );
};
