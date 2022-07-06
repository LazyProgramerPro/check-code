import React from 'react';
import insideUnit from '../styled/assets/images/homepage/connected_unit/insideUnit.svg';
import {IOrganizationItem, IOrganizationObject} from '../redux/models';
import {useAppSelector} from 'src/redux/hooks';
import {gen_uuid} from "../../../utils/string_utils";

export const Organization = function () {

  const selectHomePageState = useAppSelector(state => state.mainPage.homePage.data);

  return (
    <div className="connect-unit organization-wrapper">
      <div className="organization-wrapper-title title-header">
        <h1 className="name">CÁC ĐƠN VỊ ĐANG KẾT NỐI</h1>
      </div>
      <div className="header__flex">
        <div className="header--line"/>
      </div>
      <div className="connect-unit--list organization-list">
        {selectHomePageState?.organizations?.map((org: IOrganizationObject, index: number) => {
          return (
            <div className="connect-unit--list organization-item">
              <UnitList organizations={org.organizations} group_name={org.group_name}/>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const UnitList = ({organizations, group_name}: IOrganizationObject) => {
  return (
    <div className="inside-unit">
      <div className="unit--header">
        <h1>{group_name}</h1>
      </div>
      <div className="unit-item--list unit-list">
        {organizations?.map((unit: IOrganizationItem, index: number) => {
          return <UnitItem name={unit?.name} domain={unit?.domain}/>
        })}
      </div>
    </div>
  );
}

const UnitItem = ({name, domain}: IOrganizationItem) => {
  return (
    <div className="unit-infor unit-item">
      <div className="unit-infor--img">
        <img src={insideUnit} alt="inside_unit"/>
      </div>
      <div className="unit-infor--text">
        <p title={name}>{name}</p>
        <a target="_blank" href={domain} title={domain}>{domain}</a>
      </div>
    </div>
  );
}

export default Organization;
