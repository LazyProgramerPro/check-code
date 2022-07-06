import React from 'react';
import styled from 'styled-components';
import {Col, DatePicker, Divider, Icon, Radio, Row, Select} from 'antd';
import moment from 'moment';
import "moment/locale/vi";

import {H4, Panel, PanelContent, PanelHeader} from './Common';
import {LOCALE_CONFIG} from './Constant';

const {MonthPicker} = DatePicker
const monthFormat = 'MMMM, YYYY';
const {Option} = Select;

const Statistic = (props: any) => {
  const {
    filters: {time, type, group},
    onChangeFilter,
  } = props

  return (
    <Wrapper>
      <PanelHeader>
        <MonthPickerWrapper>
          <Icon type="left" onClick={() => onChangeFilter(moment(time.subtract(1, "month")), 'time')}/>
          <MonthPicker
            suffixIcon={<></>}
            allowClear={false}
            locale={LOCALE_CONFIG}
            format={monthFormat}
            value={time}
            onChange={(value) => onChangeFilter(value, 'time')}/>
          <Icon type="right" onClick={() => onChangeFilter(moment(time.add(1, "month")), 'time')}/>
        </MonthPickerWrapper>

        <FilterItem>
          <Radio.Group onChange={(value) => onChangeFilter(value, 'type')} value={type}>
            <Radio value="hour">Giờ công</Radio>
            <Radio value="day">Ngày công</Radio>
          </Radio.Group>
        </FilterItem>

        <FilterItem>
          <Select defaultValue={group} style={{width: '470px'}}
                  onChange={(value: any) => onChangeFilter(value, 'group')}>
            <Option value="tht">Xưởng Led - Điện tử & TBCSTBCS - Ngành điện tử tụ động - Tổ THT</Option>
            <Option value="smt">Xưởng Led - Điện tử & TBCSTBCS - Ngành điện tử tụ động - Tổ SMT</Option>
          </Select>
        </FilterItem>
      </PanelHeader>
      <PanelContent>
        <Row gutter={20}>
          <Col span={8}>
            <Heading>THỐNG KÊ</Heading>
            <CategoriesStatistic>
              <Category>
                <Title>Số lần đi muộn</Title>
                <Value>5</Value>
              </Category>
              <Category>
                <Title>Số lần về sớm</Title>
                <Value>4</Value>
              </Category>
              <Category>
                <Title>Số lần quên chấm công</Title>
                <Value>2</Value>
              </Category>
              <Category>
                <Title>Số ngày vắng mặt không lý do</Title>
                <Value>0</Value>
              </Category>
              <Category>
                <Title>Tổng số ngày phép</Title>
                <Value>12</Value>
              </Category>
              <Category>
                <Title>Số ngày phép đã dùng</Title>
                <Value>7</Value>
              </Category>
              <Category>
                <Title>Số ngày phép còn lại</Title>
                <Value>5</Value>
              </Category>
            </CategoriesStatistic>
          </Col>
          <Col span={16}>
            <Heading>CHẤM CÔNG</Heading>
            <Row gutter={20}>
              <Col span={12}>
                <AggregationWorkTime>
                  <WorkTime>
                    <WorkTimeTitle>CÔNG CHUẨN</WorkTimeTitle>
                    <Box>
                      <BigText>12</BigText>
                      <Label>CA NGÀY</Label>
                    </Box>
                    <StyledDivider type="vertical"/>
                    <Box>
                      <BigText>11</BigText>
                      <Label>CA ĐÊM</Label>
                    </Box>
                  </WorkTime>
                  <WorkTime>
                    <WorkTimeTitle>TỔNG CÔNG</WorkTimeTitle>
                    <Box>
                      <BigText>19.5</BigText>
                      <Label>CA NGÀY</Label>
                    </Box>
                    <StyledDivider type="vertical"/>
                    <Box>
                      <BigText>4</BigText>
                      <Label>CA ĐÊM</Label>
                    </Box>
                  </WorkTime>
                  <WorkTime>
                    <WorkTimeTitle>SỐ GIỜ LÀM VIỆC NGOÀI GIỜ</WorkTimeTitle>
                    <Box>
                      <BigText>2</BigText>
                      <Label>CA NGÀY</Label>
                    </Box>
                    <StyledDivider type="vertical"/>
                    <Box>
                      <BigText>0</BigText>
                      <Label>CA ĐÊM</Label>
                    </Box>
                  </WorkTime>
                </AggregationWorkTime>
              </Col>
              <Col span={12}>
                <AggregationDayOff>
                  <DayOffRow>
                    <Title>NGHỈ PHÉP</Title>
                    <DayOffBox>
                      <BigText>6</BigText>
                      <Label>CA ĐÊM</Label>
                    </DayOffBox>
                  </DayOffRow>
                  <DayOffRow>
                    <Box>
                      <BigText>4</BigText>
                      <Label>NGHỈ THƯỜNG</Label>
                    </Box>
                    <StyledDivider type="vertical"/>
                    <Box>
                      <BigText>2</BigText>
                      <Label>NGHỈ CHẾ ĐỘ</Label>
                    </Box>
                    <StyledDivider type="vertical"/>
                    <DayOffBox>
                      <BigText>0</BigText>
                      <Label>NGHỈ KHÔNG LƯƠNG</Label>
                    </DayOffBox>
                  </DayOffRow>
                </AggregationDayOff>
              </Col>
            </Row>
          </Col>
        </Row>
      </PanelContent>
    </Wrapper>
  );
};

const Wrapper = styled(Panel)`
    min-height: 375px;
`

const FilterItem = styled.div``

const MonthPickerWrapper = styled.div`
    display: flex;
    align-items: center;

    .ant-calendar-picker-input.ant-input {
        border: none;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        text-transform: capitalize;
        cursor: pointer;
        background-color: transparent;

        &:focus {
            box-shadow: none;
        }
    }
`

const StyledDivider = styled(Divider)`
    height: 43px;
    color: #D9D9D9;
`

const Heading = styled(H4)`
    margin-bottom: 10px;
`

const Title = styled.div``

const Value = styled.div`
    font-weight: 500;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

const BigText = styled.span`
    font-weight: 500;
    font-size: 30px;
    line-height: 30px;
    color: #27343B;
`

const Label = styled.span`
    color: #979797;
    font-size: 12px;
`

const CategoriesStatistic = styled.div`
    display: flex;
    flex-direction: column;
    background: #F4F4F4;
    border: 1px solid #E5EBF1;
    border-radius: 4px;
    padding: 0 10px;
    min-height: 250px;
`

const Category = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    padding: 5px 10px;

    &:not(:last-child) {
        border-bottom: 1px solid #E5EBF1;
    }
`

const AggregationWorkTime = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250px;
`

const WorkTime = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: #F4F4F4;
    border: 1px solid #E5EBF1;
    border-radius: 4px;
`

const WorkTimeTitle = styled.div`
    width: 40%;
`

const AggregationDayOff = styled.div`
    display: flex;
    min-height: 250px;
    flex-direction: column;
    padding: 12px 20px;
    background: #F4F4F4;
    border: 1px solid #E5EBF1;
    border-radius: 4px;
`

const DayOffRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
`

const DayOffBox = styled(Box)`
    width: 40%;
`

export default Statistic;
