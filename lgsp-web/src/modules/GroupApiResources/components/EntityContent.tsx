import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input, Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import produce, { Draft } from 'immer'
import ListControlParams from './ListControlParams';
import ParamTable from './ParamTable';
import ListControlResponse from './ListControlResponse';
import { IApiEndpointEntity, IParamObject, IResponseObject } from '../redux/models';
import { useAppDispatch } from 'src/redux/hooks';
import { changeContentModal, changeTitleModal, hideModal, showModal } from 'src/modules/Modal/redux/actions';
import UpdateParamForm from './UpdateParamForm';
import ResponseTable from './ResponseTable';
import UpdateResponseForm from './UpdateResponseForm';
const { TextArea } = Input;
interface IEntityContent {
  setFieldValue: (field: string, value: any) => void,
  resource: IApiEndpointEntity,
  path: string,
  onEditResource: (values: IApiEndpointEntity, path: string) => void
}



const EntityContent = (props: IEntityContent) => {
  const { resource, path, onEditResource } = props;
  const dispatch = useAppDispatch()
  const initialObjectParam: IParamObject = {
    in: '',
    name: '',
    required: false,
    type: ''
  }

  const initialObjectResponse: IResponseObject = {
    description: '',
    code: undefined
  }
  const [objectParam, setObjectParam] = useState(initialObjectParam);
  const [objectResponse, setObjectResponse] = useState(initialObjectResponse);
  const [listTableResource, setListTableResource] = useState<IApiEndpointEntity>(resource);
  const handleChangeParam = (value: string | boolean, type: string) => {
    setObjectParam({ ...objectParam, [type]: value })
  }

  const handleChangeResponse = (value: string | boolean | number, type: string) => {
    setObjectResponse({ ...objectResponse, [type]: value })
  }
  const resetObjectParam = () => {
    setObjectParam(initialObjectParam)
  }

  const resetObjectResponse = () => {
    setObjectResponse(initialObjectResponse)
  }

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextState = produce(listTableResource, (draftState: Draft<IApiEndpointEntity>) => {
      draftState.description = event.target.value
    })
    onEditResource(nextState, path)
  }
  const handleAddParams = () => {
    const nextState = produce(listTableResource, (draftState: Draft<IApiEndpointEntity>) => {
      draftState.params = draftState.params ?? [];
      draftState.params.push({ ...objectParam, id: uuidv4() });
    })
    // setListTableResource(cloneListTableResource);
    onEditResource(nextState, path)
  }

  const handleAddResponse = () => {
    const nextState = produce(listTableResource, (draftState: Draft<IApiEndpointEntity>) => {
      draftState.responses = draftState.responses ?? [];
      draftState.responses.push({ ...objectResponse, id: uuidv4() });
    })
    // setListTableResource(cloneListTableResource);
    onEditResource(nextState, path)
  }

  const handleDeleteParamTableRow = (row: IParamObject) => {
    Modal.confirm({
      content: 'Bạn có chắc muốn xóa bản ghi này không?',
      onOk() {
        const nextState = produce(listTableResource, (draftState: Draft<IApiEndpointEntity>) => {
          draftState.params = draftState.params?.filter((param: IParamObject) => param.id !== row.id)
        })
        onEditResource(nextState, path)
      },
      onCancel() {
      },
    });
  }

  const handleDeleteResponseTableRow = (row: IParamObject) => {
    Modal.confirm({
      content: 'Bạn có chắc muốn xóa bản ghi này không?',
      onOk() {
        const nextState = produce(listTableResource, (draftState: Draft<IApiEndpointEntity>) => {
          draftState.responses = draftState.responses?.filter((response: IResponseObject) => response.id !== row.id)
        })
        onEditResource(nextState, path)
      },
      onCancel() {
      },
    });
  }

  const handleEditResponseTableRow = (row: IResponseObject) => {
    dispatch(showModal());
    dispatch(changeContentModal({ component: <UpdateResponseForm formData={row} onCancel={handleCloseModal} onSubmit={handleUpdateResponseForm} /> }))
    dispatch(changeTitleModal({ title: 'Thay đổi Response' }))
  }

  const handleCloseModal = () => {
    dispatch(hideModal());
  }

  const handleUpdateParamForm = (value: IParamObject) => {
    const nextState = produce(listTableResource, (draftState: Draft<IApiEndpointEntity>) => {
      const paramRowEditIndex = draftState.params?.findIndex((param: IParamObject) => param.id === value.id);
      draftState.params[paramRowEditIndex] = value;
    })
    onEditResource(nextState, path)
    dispatch(hideModal())
  }

  const handleUpdateResponseForm = (value: IResponseObject) => {
    const nextState = produce(listTableResource, (draftState: Draft<IApiEndpointEntity>) => {
      const paramRowEditIndex = draftState.responses?.findIndex((response: IResponseObject) => response.id === value.id);
      draftState.responses[paramRowEditIndex] = value;
    })
    onEditResource(nextState, path)
    dispatch(hideModal())
  }

  const handleEditParamTableRow = (row: IParamObject) => {
    dispatch(showModal());
    dispatch(changeContentModal({ component: <UpdateParamForm formData={row} onCancel={handleCloseModal} onSubmit={handleUpdateParamForm} /> }))
    dispatch(changeTitleModal({ title: 'Thay đổi tham số' }))
  }

  useEffect(() => {
    setListTableResource(resource);
  }, [resource])
  return (

    <div className="entity-content-container">
      <div className="entity-summary-box">
        <div className="header mb-4">
          <span>Tóm tắt</span>
        </div>
        <div className="list-control">
          <TextArea rows={4} value={resource.description} onChange={handleChangeDescription} />
        </div>
      </div>
      <div className="entity-content-params">
        <div className="header mb-4">
          Tham số
        </div>
        <div className="list-control list-control-param">
          <ListControlParams onResetParams={resetObjectParam} objectParam={objectParam} onChange={handleChangeParam} onAddParams={handleAddParams} />
        </div>
        <div className="params-table container  mt-4">
          <ParamTable dataSource={listTableResource.params} onDelete={handleDeleteParamTableRow} onEdit={handleEditParamTableRow} />
        </div>
      </div>
      <div className="entity-content-response">
        <div className="header mb-4">
          Cấu hình Response
        </div>
        <div className="list-control list-control-response">
          <ListControlResponse objectResponse={objectResponse} onChange={handleChangeResponse} onResetResponse={resetObjectResponse} onAddResponse={handleAddResponse} />
        </div>
        <div className="response-table container mt-4">
          <ResponseTable dataSource={listTableResource.responses} onDelete={handleDeleteResponseTableRow} onEdit={handleEditResponseTableRow} />
        </div>
      </div>
    </div>
  )
}

export default EntityContent

