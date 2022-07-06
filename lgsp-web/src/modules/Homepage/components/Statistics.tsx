import React from 'react';
import connect_icon from '../styled/assets/images/homepage/general_statistics/connect.png';
import { IStatsObject } from '../redux/models';
import styled from 'styled-components';

interface IStatistics {
  statistics?: IStatsObject[];
}
const View = styled.div``;
export const Statistics = (props: IStatistics) => {
  const { statistics } = props;
  return (
    <View>
      <div className="statistics-container">
        <div className="general-statistics statistics-wrapper ">
          <div className="statistics-wrapper-title title-header">
            <h1 className="header--blue-text name">THỐNG KÊ CHUNG</h1>
          </div>
          <div className="header__flex">
            <div className="header--line" />
          </div>
          <div className="general-statistics--list">
            {statistics?.map((statistic: IStatsObject, index: number) => {
              return <StatItem statistic={statistic} key={index} />;
            })}
          </div>
        </div>
      </div>
    </View>
  );
};

interface IStatisticItem {
  statistic: IStatsObject;
}
const StatItem = (props: IStatisticItem) => {
  const { statistic } = props;
  return (
    <div className="general-statistics--item">
      <div className="general-statistics--img">
        <img src={statistic?.icon ? statistic?.icon : connect_icon} alt="this is img of statistic item " />
      </div>
      <div className="general-statistics--title">
        <p>{statistic?.stat_name}</p>
      </div>
      <div className="general-statistics--counter">
        <p>{statistic?.count}</p>
      </div>
    </div>
  );
};

export default Statistics;
