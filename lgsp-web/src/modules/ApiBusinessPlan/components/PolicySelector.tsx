import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { changeApiPolicy, getApiPolicy, reloadApiPolicyData } from '../redux/actions/get_api_policy';
import { updateApiPolicy } from '../redux/actions/update_api_policy';
import { Button, Checkbox } from 'antd';
import { getAllPolicyService } from '../redux/services/apis';
import CheckboxGroup from 'antd/es/checkbox/Group';
import { UpdateApiPolicyParam } from '../redux/models';
import { useParams } from 'react-router';
import Loading from '../../../components/Loading';
import styled from 'styled-components';

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.apiBusinessPlan.getPolicyState,
  updateState: rootState.apiBusinessPlan.updatePolicyState,
});
const connector = connect(mapStateToProps, { getApiPolicy, updateApiPolicy, reloadApiPolicyData, changeApiPolicy });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

interface CheckBoxType {
  label: string;
  value: string;
}

const PolicySelector = (props: IProps) => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);

  const [policies, setPolicies] = useState<string[]>([]);

  const [html, setHtml] = useState<any[]>([]);

  const [policyCheckBox, setPolicyCheckBox] = useState<CheckBoxType[]>([]);

  useEffect(() => {
    props.getApiPolicy(apiId);
    getAllPolicyService().then(rs => {
      setHtml(rs.rows);
      const data = rs.rows.map((item: any) => {
        return {
          label: item.displayName,
          value: item.name,
        };
      });
      setPolicyCheckBox(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId]);

  useEffect(() => {}, [props.getState.loading === true]);

  const checkPolicy = (checkedValues: any) => {
    props.changeApiPolicy(checkedValues);
  };

  const renderPolicyCheckBox = (dataPolicy: any[]) => {
    return dataPolicy.map((item: any) => {
      return (
        <div key={item.name}>
          <Checkbox key={item.name} style={{ padding: '10px' }} value={item.name}>
            {item.displayName} ({item.description})
          </Checkbox>
          <br />
        </div>
      );
    });
  };

  const onBtnSaveClicked = (e: any) => {
    const param: UpdateApiPolicyParam = {
      apiId: apiId,
      policies: props.getState.item.policies,
    };
    props.updateApiPolicy(param);
  };

  return (
    <Wrapper>
      <div className="api-business-plan-policy-content mt-5">
        {/*<CheckboxGroup value={props.getState.item.policies}*/}
        {/*               options={policyCheckBox} style={{display: "inline-block"}} onChange={checkPolicy}/>*/}
        <CheckboxGroup value={props.getState.item.policies} onChange={checkPolicy}>
          {renderPolicyCheckBox(html)}
        </CheckboxGroup>
      </div>
      <Button className="mt-3" type="primary" onClick={onBtnSaveClicked}>
        Lưu
      </Button>
      {props.getState.loading || props.updateState.loading ? <Loading /> : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .api-business-plan-policy-content {
    padding: 20px;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 41%);
    border-radius: 5px;
  }
`;

export default connector(PolicySelector);
