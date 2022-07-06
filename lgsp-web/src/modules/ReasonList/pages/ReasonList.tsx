import React, {useEffect, useState} from 'react';
import env from 'src/configs/env';
import {Tabs} from 'antd';
import {RootState} from 'src/redux/reducers';
import {connect, ConnectedProps} from 'react-redux';

import LeaveReasonList from '../components/LeaveReasonList';
import CreateReasonForm from '../components/CreateNewReasonForm';

const mapState = ({auth: {auth}}: RootState) => ({
  auth,
});
const connector = connect(mapState, {});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

const {TabPane} = Tabs;

function ReasonList(props: IProps) {
  const canCreate = props.auth.data?.permission?.includes('create-reason');
  const [isOpenModal, setOpenModal] = useState(false);
  const [updateList, setUpdateList] = useState('');
  const [changeTab, setChangeTab] = useState(1)

  useEffect(() => {
    document.title = env.pageTitle + 'Danh sách lý do';
  }, []);

  function callback(key: any) {
    if (changeTab === key) {

    } else {
      setChangeTab(key)
    }
  }

  const handleCreate = () => {
    setOpenModal(true);
  }

  const reloadList = (data: any) => {
    setUpdateList(data)
  }

  return (
    <>
      <div className="contentPage reason-list">
        {/*{canCreate && <div className="tmp-btn" style={{ display: 'flex', justifyContent: 'flex-end' }}>*/}
        {/*    <Button className="mb-10" onClick={handleCreate}><Icon type="plus"/>Thêm mới</Button>*/}
        {/*</div>}*/}
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Lý do nghỉ" key="1">
            <LeaveReasonList updateList={updateList}/>
          </TabPane>
          {/*Comment BTN-MT*/}
          {/*<TabPane tab="Lý do làm việc ngoài cơ quan" key="2">*/}
          {/*    <WorkingOutsideReasonList auth={props.auth} updateList={updateList}  />*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="Lý do làm việc cuối tuần" key="3">*/}
          {/*    <OvertimeReasonList auth={props.auth} updateList={updateList} />*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="Lý do điểm danh thủ công" key="4">*/}
          {/*    <ForgetCheckinReasonList auth={props.auth} updateList={updateList} />*/}
          {/*</TabPane>*/}
        </Tabs>
      </div>
      <CreateReasonForm isOpenModal={isOpenModal} reloadList={reloadList} setOpenModal={setOpenModal} editData={''}/>
    </>
  );
}

export default connector(ReasonList);
