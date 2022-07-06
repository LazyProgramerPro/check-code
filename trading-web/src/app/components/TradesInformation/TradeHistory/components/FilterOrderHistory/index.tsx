import {
  Container,
  SelectButton,
  TimeRangeGroup,
  ResetButton,
  SearchButton,
} from './style';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTradehistorySlice } from '../../slice';
import { useTranslation } from 'react-i18next';
import { selectTradehistory } from '../../slice/selectors';

const FilterOrderHistory = () => {
  const { RangePicker } = DatePicker;
  const [time, setTime] = useState(1);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useTradehistorySlice();
  const [startTimeRange, setStartTimeRange]: any = useState();
  const [endTimeRange, setEndTimeRange]: any = useState();
  const dataTradeHistory: any = useSelector(selectTradehistory);

  const onChangeTimeRange = (value: any) => {
    setStartTimeRange(moment(value[0]).valueOf());
    setEndTimeRange(moment(value[1]).valueOf());
  };
  const select1Day = () => {
    const data = {
      startTime: moment().startOf('day').valueOf(),
      endTime: moment().valueOf(),
      pageIndex: dataTradeHistory?.pageIndex,
      pageSize: dataTradeHistory?.pageSize,
    };
    setTime(1);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const select1Week = () => {
    const data = {
      startTime: moment().subtract(1, 'w').startOf('day').valueOf(),
      endTime: moment().valueOf(),
      pageIndex: dataTradeHistory?.pageIndex,
      pageSize: dataTradeHistory?.pageSize,
    };
    setTime(2);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const select1Month = () => {
    const data = {
      startTime: moment().subtract(1, 'month').startOf('day').valueOf(),
      endTime: moment().valueOf(),
      pageIndex: dataTradeHistory?.pageIndex,
      pageSize: dataTradeHistory?.pageSize,
    };
    setTime(3);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const select3Months = () => {
    const data = {
      startTime: moment().subtract(1, 'month').startOf('day').valueOf(),
      endTime: moment().valueOf(),
      pageIndex: dataTradeHistory?.pageIndex,
      pageSize: dataTradeHistory?.pageSize,
    };
    setTime(4);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const handleSearch = () => {
    const data = {
      startTime: startTimeRange,
      endTime: endTimeRange,
      pageIndex: dataTradeHistory?.pageIndex,
      pageSize: dataTradeHistory?.pageSize,
    };
    setTime(5);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const handleReset = () => {
    select1Day();
  };
  useEffect(() => {
    if (time === 1) {
      select1Day();
    } else if (time === 2) {
      select1Week();
    } else if (time === 3) {
      select1Month();
    } else if (time === 4) {
      select3Months();
    } else if (time === 5) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, dispatch, dataTradeHistory?.pageSize]);
  return (
    <Container>
      <div className="wrapper">
        <div className="d-flex align-items-center filterDay">
          <SelectButton
            data-type={time === 1 ? 'active' : 'normal'}
            onClick={select1Day}
          >
            1 {t('day')}
          </SelectButton>
          <SelectButton
            data-type={time === 2 ? 'active' : 'normal'}
            onClick={select1Week}
          >
            1 {t('week')}
          </SelectButton>
          <SelectButton
            data-type={time === 3 ? 'active' : 'normal'}
            onClick={select1Month}
          >
            1 {t('month')}
          </SelectButton>
          <SelectButton
            data-type={time === 4 ? 'active' : 'normal'}
            onClick={select3Months}
          >
            3 {t('months')}
          </SelectButton>
        </div>
        <TimeRangeGroup>
          <div className="time-range--label">{t('time')}</div>
          <RangePicker
            separator={<span>{t('to')}</span>}
            placeholder={['YYYY-MM-DD', 'YYYY-MM-DD']}
            onChange={onChangeTimeRange}
          />
        </TimeRangeGroup>
        <div className="btnGroup">
          <SearchButton onClick={handleSearch}>{t('search')}</SearchButton>

          <ResetButton data-bn-type="button" onClick={handleReset}>
            {t('reset')}
          </ResetButton>
        </div>
      </div>
      <div></div>
    </Container>
  );
};
export default FilterOrderHistory;
