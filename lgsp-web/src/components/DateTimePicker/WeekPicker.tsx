import styled from 'styled-components';
import React, {useRef, useEffect} from 'react';
import moment from 'moment';
import {DatePicker, Icon } from 'antd';
import { LOCALE_CONFIG } from './Constant';

const { WeekPicker } = DatePicker;

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
    justify-content: center;
`;

const Display = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
`;

const CoverIcon = styled(Icon)`
    margin: 5px 20px;
`;

const Date = styled.div`
    overflow: hidden;
    font-weight: bold;
    white-space: nowrap;
`;

const Separator =  styled.div`
    font-size: 24px;
    margin: 0px 10px;
    line-height: 20px;
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

  
export const WeekPickerWrapper = (props: any) => {
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const { onChange, selectedTime } = props; // selectedTime first day of week;

    const setLastWeek = () => {
        const lastWeek = moment(selectedTime).subtract(7, 'days');
        onChange(lastWeek);
    }

    const setNextWeek = () => {
        const nextWeek = moment(selectedTime).add(7, 'days');
        onChange(nextWeek);
    }

    const onSelectedWeek = (date: any, dateString: string) => {
        const monday = moment(date).startOf("week");
        onChange(monday);
        setShowDatePicker(false);
    }

    const ref = useRef(null);

    useOutsideClick(ref, () => {
        setShowDatePicker(false);
    });

    return (
        <Cover style={props.style || {}} ref={ref}>
            <Center>
                <WeekPicker
                    suffixIcon={<></>}
                    locale={LOCALE_CONFIG}
                    style={{width: 0, overflow: "hidden"}}
                    popupStyle={{paddingTop: 35, paddingLeft: 40}}
                    open={showDatePicker}
                    value={moment(selectedTime)}
                    onChange={onSelectedWeek}
                />
                <CoverIcon type="left" onClick={setLastWeek} />
                <Display onClick={() => setShowDatePicker(true)}>
                    <Date>
                        {moment(selectedTime).startOf('week').format("[Ngày] DD MMMM [năm] YYYY")}
                    </Date>
                    <Separator>-</Separator> 
                    <Date>
                        {moment(selectedTime).endOf('week').format("[Ngày] DD MMMM [năm] YYYY")}
                    </Date>
                </Display>
                <CoverIcon type="right" onClick={setNextWeek} />
            </Center>
        </Cover>
    );
};