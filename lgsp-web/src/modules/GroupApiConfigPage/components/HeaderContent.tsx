import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import Loading from 'src/components/Loading';
import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import { getGroupApiDetail } from 'src/modules/GroupApiDetail/redux/actions';
import { useAppDispatch } from 'src/redux/hooks';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { STATUS_API_MAP } from '../../../constants/common';

interface IHeaderContentGroupApi {
  groupApiDetailData: IRestApiObject | null;
  // onClick: () => void;
  // openXML: Function;
}

interface IParams {
  apiId: string;
}

const mapState = (rootState: RootState) => ({});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, IHeaderContentGroupApi {}

const HeaderContent = (props: IProps) => {
  const { groupApiDetailData } = props;
  const params: IParams = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGroupApiDetail(params.apiId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.apiId]);
  return (
    <View>
      <div className="info">
        <div>
          API: {groupApiDetailData?.context}/{groupApiDetailData?.version}
        </div>
        <div>Tạo bởi: {groupApiDetailData?.provider}</div>
      </div>

      <div className="status">Trạng thái: {STATUS_API_MAP.get(groupApiDetailData?.status || '')}</div>

      {groupApiDetailData?.loading ? <Loading /> : null}
    </View>
  );
};

const View = styled.div`
  height: 73px;
  display: flex;
  align-items: center;
  background: #ffffff;

  margin: 0px -15px 15px;

  .info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0px 15px;
    border-right: 1px solid #e8e8e8;
    font-size: 15px;
  }
  .status {
    padding-left: 15px;
    font-size: 15px;
  }
`;

export default connector(HeaderContent);
