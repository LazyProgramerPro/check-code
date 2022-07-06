import styled from 'styled-components';
import React, {useRef, useEffect} from 'react';
import moment from 'moment';
import {DatePicker, Icon } from 'antd';
import { LOCALE_CONFIG } from './Constant';

const { MonthPicker } = DatePicker;

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
    const handleClick = (e:any) => {
        const popupPicker = e.target.closest(".ant-calendar-picker-container");
        if (!popupPicker && ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
};

export const MonthPickerWrapper = (props: any) => {
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const { onChange, selectedTime } = props; // selectedTime first day of week;

    const setLastMonth = () => {
        const lastMonth = moment(selectedTime).subtract(1, 'months');
        onChange(lastMonth);
    }

    const setNextMonth = () => {
        const nextMonth = moment(selectedTime).add(1, 'months');
        onChange(nextMonth);
    }

    const onSelectedMonth = (date: any) => {
        const firstOne = moment(date);
        onChange(firstOne);
        setShowDatePicker(false);
    }

    const ref = useRef(null);

    useOutsideClick(ref, () => {
        setShowDatePicker(false);
    });

    return (
        <Cover style={props.style || {}} ref={ref}>
            <MonthPicker
                suffixIcon={<></>}
                locale={LOCALE_CONFIG}
                style={{width: 0, overflow: "hidden"}}
                popupStyle={{paddingTop: 35, paddingLeft: 40}}
                open={showDatePicker}
                value={moment(selectedTime)}
                onChange={onSelectedMonth}
                monthCellContentRender={(date: any) => moment(date).format("[Tháng] M")}
            />
            <Center>
                <CoverIcon type="left" onClick={setLastMonth} />
                <Date onClick={() => setShowDatePicker(true)}>
                    {moment(selectedTime).format("[Tháng] MM [năm] YYYY")}
                </Date>
                <CoverIcon type="right" onClick={setNextMonth} />
            </Center>
        </Cover>
    );
};
  
