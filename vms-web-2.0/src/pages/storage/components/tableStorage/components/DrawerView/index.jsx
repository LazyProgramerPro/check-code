import { notify } from '@/components/Notify';
import { AI_SOURCE } from '@/constants/common';
import ExportEventFileApi from '@/services/exportEventFile';
import EventAiAPI from '@/services/storage-api/eventAI-api';
import eventFilesApi from '@/services/storage-api/eventFilesApi';
import permissionCheck from '@/utils/PermissionCheck';
import { saveAs } from 'file-saver';

import {
  CloseOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PlayCircleOutlined,
  SaveOutlined,
  StarOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Button, Col, Collapse, Input, Row, Select, Space, Spin } from 'antd';
import Popconfirm from 'antd/es/popconfirm';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { connect, useIntl } from 'umi';
import {
  CAPTURED_NAMESPACE,
  DAILY_ARCHIVE_NAMESPACE,
  EVENT_AI_NAMESPACE,
  EVENT_FILES_NAMESPACE,
  IMPORTANT_NAMESPACE,
  PROCESSING_STATUS_OPTIONS,
} from '../../../../constants';
import PreviewMap from '../PreviewMap/PreviewMap';
import VideoPlayer from '../VideoPlayer';
import DrawerTicket from './components/DrawerTicket';
import {
  CollapseStyled,
  HeaderPanelStyled,
  MSCustomizeDrawerStyled,
  StyledEventFileDetail,
  VideoOverlay,
} from './style';

const { Panel } = Collapse;

let defaultEventFile = {
  id: '',
  uuid: '',
  eventUuid: '',
  eventName: '',
  name: '',
  violationTime: -1,
  createdTime: -1,
  note: '',
  cameraUuid: '',
  cameraName: '',
  type: -1,
  length: 0,
  address: '',
  rootFileUuid: '',
  pathFile: '',
  isImportant: false,
  thumbnailData: [''],
  nginx_host: '',
  blob: null,
  isSaved: false,
  tBlob: null,
};

function DrawerView({ isOpenView, dataSelected, onClose, state, nameSpace, dispatch, eventList }) {
  const intl = useIntl();
  const [data, setData] = useState(dataSelected);
  const [note, setNote] = useState(dataSelected.note ? dataSelected.note : '');

  const [detailAI, setDetailAI] = useState(defaultEventFile);

  const [listLongLat, setListLongLat] = useState([]);
  const [tracingList, setTracingList] = useState([]);

  const [processState, setProcessState] = useState(PROCESSING_STATUS_OPTIONS[0]);

  const [imageViolate, setImageViolate] = useState(null);
  const [plateNumber, setPlateNumber] = useState(null);
  const [imageVehicle, setImageVehicle] = useState(null);

  const [imageAICurrent, setImageAICurrent] = useState(null);

  const [currNode, setCurrNode] = useState('');
  const [objectType, setObjectType] = useState(null);
  const [imageOther, setImageOther] = useState([]);

  const [videoErrorURL, setVideoErrorURL] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingDrawer, setLoadingDrawer] = useState(false);

  const [openDrawerTicket, setOpenDrawerTicket] = useState(false);

  const hasVideo = detailAI?.videoUrl ? true : false;

  const [urlSnapshot, setUrlSnapshot] = useState('');
  const [downloadFileName, setDownloadFileName] = useState('');

  const [eventSelected, setEventSelected] = useState(
    dataSelected.eventUuid ? dataSelected.eventUuid : null,
  );

  const [loadingDownload, setLoadingDownload] = useState(false);

  const saveUrlSnapshot = (url) => {
    setUrlSnapshot(url);
  };

  const saveFileDownloadFileName = (filename) => {
    setDownloadFileName(filename);
  };

  const handleOpenDrawerTicket = () => {
    setOpenDrawerTicket(true);
  };

  const handleCloseDrawerTicket = () => {
    setOpenDrawerTicket(false);
  };

  const handleRefresh = (payload = null) => {
    if (payload) {
      setData(payload);
    }

    const { metadata } = state[nameSpace];
    const dataParam = Object.assign({ ...metadata });
    dispatch({
      type: `${nameSpace}/fetchAll`,
      payload: dataParam,
    });
  };

  const getTracingEvents = () => {
    const payload = {
      page: 0,
      size: 15,
    };
    EventAiAPI.getTracingEvents(data.uuid, payload)
      .then((data) => {
        setTracingList(data?.payload);
        const longLats = data.map((item) => {
          return [item.lat_, item.long_];
        });
        setListLongLat(longLats);
      })
      .catch((err) => {
        console.log('getTracingEvents err', err);
      });
  };

  const renderTitle = () => {
    if (nameSpace === EVENT_AI_NAMESPACE) {
      return (
        <>
          {intl.formatMessage({
            id: 'view.storage.detail_file_AI',
          })}
        </>
      );
    }

    return (
      <>
        {intl.formatMessage({
          id: 'view.storage.detail_file',
        })}
      </>
    );
  };

  const handleDeleteFile = () => {
    if (nameSpace === DAILY_ARCHIVE_NAMESPACE || data.tableName === 'file') {
      //DAILY ARCHIVE
      ExportEventFileApi.deletePhysicalFile(data.uuid)
        .then((res) => {
          if (res.code === 800) {
            return ExportEventFileApi.deleteFile(data.uuid);
          }
        })
        .then((res) => {
          notify('success', 'noti.archived_file', 'noti.successfully_delete_file');
          handleRefresh();
          onClose();
        })
        .catch((err) => {
          console.log(err);
          notify('error', 'noti.archived_file', 'noti.error_delete_file');
        });

      return;
    }

    if (nameSpace === EVENT_AI_NAMESPACE) {
      // Event AI
      EventAiAPI.delete(data.uuid)
        .then((res) => {
          notify('success', 'noti.archived_file', 'noti.successfully_delete_file');
          handleRefresh();
          onClose();
        })
        .catch((err) => {
          console.log(err);
          notify('error', 'noti.archived_file', 'noti.error_delete_file');
        });
      return;
    }

    if (data.type === 0) {
      // CAPTURED - VIDEO | IMPORTANT - VIDEO | EVENT - VIDEO
      ExportEventFileApi.deletePhysicalFile(data.uuid)
        .then((res) => {
          if (res.code === 800) {
            return ExportEventFileApi.deleteEventFile(data.uuid);
          }
        })
        .then((res) => {
          notify('success', 'noti.archived_file', 'noti.successfully_delete_file');
          handleRefresh();
          onClose();
        })
        .catch((err) => {
          console.log(err);
          notify('error', 'noti.archived_file', 'noti.error_delete_file');
        });

      return;
    }

    // CAPTURED - IMAGE  | IMPORTANT - IMAGE | EVENT - IMAGE
    ExportEventFileApi.deleteFileData(data.pathFile)
      .then((res) => {
        if (res.code === '1600') {
          return ExportEventFileApi.deleteEventFile(data.uuid);
        }
      })
      .then((res) => {
        notify('success', 'noti.archived_file', 'noti.successfully_delete_file');
        handleRefresh();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        notify('error', 'noti.archived_file', 'noti.error_delete_file');
      });

    return;
  };

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  const handleChangeEventType = (value) => {
    setEventSelected(value);
  };

  const handleSaveNote = () => {
    handleUpdateFile(null, note, eventSelected);
  };

  const handleUpdateFile = (isImportant = null, noteValue = null, event = null) => {
    let perStr = '';
    if (isImportant !== null) perStr = 'mark_important_file';
    if (noteValue !== null) perStr = 'edit_file_note';
    const per = permissionCheck(perStr);

    if (!per) {
      notify('error', 'noti.archived_file', 'noti.do_not_have_permission_to_action');
      return;
    }

    if (nameSpace === EVENT_AI_NAMESPACE) {
      //no function
      return;
    }

    let params = Object.assign({ ...data, length: Number(data.length) });

    if (isImportant !== null) params = Object.assign({ ...params, isImportant: isImportant });
    if (noteValue !== null) params = Object.assign({ ...params, note: noteValue });

    if (event !== null) {
      const event = eventList.find((e) => e.uuid === eventSelected);
      params = Object.assign({ ...params, eventUuid: event.uuid, eventName: event.name });
    }

    if (data.hasOwnProperty('tableName') && data.tableName === 'file') {
      // file
      params = Object.assign({ ...params, tableName: 'file' });

      eventFilesApi
        .updateFile(params, params.uuid)
        .then((res) => {
          notify('success', 'noti.archived_file', 'noti.successfully_edit_file');
          handleRefresh({ ...res.payload, tableName: 'file' });
        })
        .catch((err) => {
          notify('error', 'noti.archived_file', 'noti.ERROR');
        });

      return;
    }

    if (data.hasOwnProperty('tableName') || data.tableName === 'event_file') {
      // event_file
      params = Object.assign({
        ...params,
        tableName: 'event_file',
      });

      eventFilesApi
        .updateEventFile(params, params.uuid)
        .then((res) => {
          // handleRefresh(res.payload);
          // not found any playback when call api accept request,
          handleRefresh({ ...res.payload, diskId: 2, tableName: 'event_file' });
          notify('success', 'noti.archived_file', 'noti.successfully_edit_file');
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    //
    if (!data.hasOwnProperty('tableName')) {
      if (nameSpace === DAILY_ARCHIVE_NAMESPACE) {
        // file
        params = Object.assign({ ...params, tableName: 'file' });

        eventFilesApi
          .updateFile(params, params.uuid)
          .then((res) => {
            notify('success', 'noti.archived_file', 'noti.successfully_edit_file');
            handleRefresh({ ...res.payload, tableName: 'file' });
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      if (nameSpace === CAPTURED_NAMESPACE || nameSpace === EVENT_FILES_NAMESPACE) {
        // event_file
        params = Object.assign({
          ...params,
          tableName: 'event_file',
        });

        eventFilesApi
          .updateEventFile(params, params.uuid)
          .then((res) => {
            // handleRefresh(res.payload);
            // not found any playback when call api accept request,
            handleRefresh({ ...res.payload, diskId: 2, tableName: 'event_file' });
            notify('success', 'noti.archived_file', 'noti.successfully_edit_file');
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      if (nameSpace === IMPORTANT_NAMESPACE) {
        eventFilesApi
          .updateEventFile(params, params.uuid)
          .then((res) => {
            // handleRefresh(res.payload);
            // not found any playback when call api accept request,

            handleRefresh({ ...res.payload, diskId: 2, tableName: 'event_file' });
            notify('success', 'noti.archived_file', 'noti.successfully_edit_file');
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }
    }
  };

  const getPermissionCheckDownload = () => {
    if (nameSpace === DAILY_ARCHIVE_NAMESPACE) return permissionCheck('download_record_file');

    if (nameSpace === CAPTURED_NAMESPACE) return permissionCheck('download_capture_file');

    if (nameSpace === EVENT_FILES_NAMESPACE) return permissionCheck('download_event_file');

    if (nameSpace === EVENT_AI_NAMESPACE) return permissionCheck('download_event_file');

    if (nameSpace === IMPORTANT_NAMESPACE) {
      if (data.tableName === 'file') {
        return permissionCheck('download_record_file');
      } else if (data.eventUuid !== '') {
        return permissionCheck('download_event_file');
      } else {
        return permissionCheck('download_capture_file');
      }
    }
    return false;
  };

  const handleDownloadFile = () => {
    setLoadingDrawer(true);
    const per = getPermissionCheckDownload();
    if (!per) {
      notify('error', 'noti.archived_file', 'noti.do_not_have_permission_to_action');
      setLoadingDrawer(false);
      return;
    }

    if (data.type === 1) {
      //image
      saveAs(urlSnapshot, downloadFileName);
      setLoadingDrawer(false);

      return;
    }

    if (nameSpace === DAILY_ARCHIVE_NAMESPACE) {
      // Call Nginx to get blob data of file
      ExportEventFileApi.downloadFileNginx(data.id, data.fileType, data.nginx_host)
        .then(async (result) => {
          const blob = new Blob([result], { type: 'octet/stream' });
          const url = window.URL.createObjectURL(blob);
          saveAs(url, downloadFileName);
          setLoadingDrawer(false);
        })
        .catch((e) => {
          console.log(e);
          setLoadingDrawer(false);

          notify('warning', 'noti.archived_file', 'noti.error_download_file');
        });

      return;
    }

    if (nameSpace === EVENT_AI_NAMESPACE) {
      if (REACT_APP_AI_SOURCE === AI_SOURCE.PHILONG) {
        ExportEventFileApi.downloadAIIntegrationFile(imageAICurrent.uuid, imageAICurrent.fileName)
          .then(async (result) => {
            const blob = new Blob([result], {
              type: 'octet/stream',
            });
            const url = window.URL.createObjectURL(blob);
            saveAs(url, imageAICurrent.fileName);
            setLoadingDrawer(false);
          })
          .catch((e) => {
            console.log(e);
            setLoadingDrawer(false);

            notify('warning', 'noti.archived_file', 'noti.error_download_file');
          });
      } else {
        ExportEventFileApi.downloadFileAI(
          imageAICurrent.cameraUuid,
          imageAICurrent.trackingId,
          imageAICurrent.uuid,
          imageAICurrent.fileName,
          4,
        )
          .then(async (result) => {
            const blob = new Blob([result], {
              type: 'octet/stream',
            });
            const url = window.URL.createObjectURL(blob);
            saveAs(url, downloadFileName);
            setLoadingDrawer(false);
          })
          .catch((e) => {
            console.log(e);
            notify('warning', 'noti.archived_file', 'noti.error_download_file');
            setLoadingDrawer(false);
          });
      }

      return;
    }

    ExportEventFileApi.downloadFileNginx(data.id, data.type, data.nginx_host)
      .then(async (result) => {
        const blob = new Blob([result], {
          type: 'octet/stream',
        });
        const url = window.URL.createObjectURL(blob);
        saveAs(url, downloadFileName);
        setLoadingDrawer(false);
      })
      .catch((e) => {
        console.log(e);
        notify('warning', 'noti.archived_file', 'noti.error_download_file');
        setLoadingDrawer(false);
      });
    return;
  };

  const renderDailyArchiveNameSpace = () => {
    return (
      <Row justify="space-between">
        <Col span={11}>
          <div className="detailInfo">
            <div className="detailInfo-title">
              {intl.formatMessage({
                id: 'view.storage.file_name',
              })}
              :
            </div>
            <div className="detailInfo-content">{data?.name}</div>
          </div>

          {nameSpace === DAILY_ARCHIVE_NAMESPACE ? (
            <div className="detailInfo">
              <div className="detailInfo-title">
                {intl.formatMessage({
                  id: 'view.storage.file_type',
                })}
                :
              </div>

              {data?.fileType === 0 && (
                <div className="detailInfo-content">
                  {intl.formatMessage({
                    id: 'view.storage.type_video',
                  })}
                </div>
              )}

              {data?.fileType === 1 && (
                <div className="detailInfo-content">
                  {intl.formatMessage({
                    id: 'view.storage.type_image',
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="detailInfo">
              <div className="detailInfo-title">
                {intl.formatMessage({
                  id: 'view.storage.file_type',
                })}
                :
              </div>

              {data?.type === 0 && (
                <div className="detailInfo-content">
                  {intl.formatMessage({
                    id: 'view.storage.type_video',
                  })}
                </div>
              )}

              {data?.type === 1 && (
                <div className="detailInfo-content">
                  {intl.formatMessage({
                    id: 'view.storage.type_image',
                  })}
                </div>
              )}
            </div>
          )}

          <div className="detailInfo">
            <div className="detailInfo-title">
              {intl.formatMessage(
                {
                  id: 'view.storage.camera_name',
                },
                {
                  cam: intl.formatMessage({ id: 'camera' }),
                },
              )}
              :
            </div>
            <div className="detailInfo-content">{data?.cameraName}</div>
          </div>

          <div className="detailInfo">
            <div className="detailInfo-title">
              {intl.formatMessage({
                id: 'view.storage.violation_time',
              })}
              :
            </div>

            {nameSpace === DAILY_ARCHIVE_NAMESPACE && (
              <div className="detailInfo-content">
                {moment(data?.createdTime * 1000).format('DD/MM/YYYY')}
              </div>
            )}

            {(nameSpace === CAPTURED_NAMESPACE || nameSpace === EVENT_FILES_NAMESPACE) && (
              <div className="detailInfo-content">
                {moment(data?.createdTime).format('DD/MM/YYYY')}
              </div>
            )}

            {nameSpace === IMPORTANT_NAMESPACE && data.tableName === 'file' && (
              <div className="detailInfo-content">
                {moment(data?.createdTime * 1000).format('DD/MM/YYYY')}
              </div>
            )}

            {nameSpace === IMPORTANT_NAMESPACE && data.tableName === 'event_file' && (
              <div className="detailInfo-content">
                {moment(data?.createdTime).format('DD/MM/YYYY')}
              </div>
            )}

            {nameSpace === EVENT_AI_NAMESPACE && (
              <div className="detailInfo-content">
                {moment(data?.createdTime).format('DD/MM/YYYY')}
              </div>
            )}
          </div>

          <div className="detailInfo">
            <div className="detailInfo-title">
              {intl.formatMessage({
                id: 'view.storage.address',
              })}
              :
            </div>
            <div className="detailInfo-content">{data?.address}</div>
          </div>
        </Col>

        <Col span={11}>
          <div className="detailInfo">
            <div className="detailInfo-title">
              {intl.formatMessage({
                id: 'view.storage.length',
              })}
              :
            </div>
            <div className="detailInfo-content">
              {moment().startOf('day').seconds(parseInt(data?.length)).format('H:mm:ss')}
            </div>
          </div>

          <div className="detailInfo">
            <div className="detailInfo-title">
              {intl.formatMessage({
                id: 'view.storage.path',
              })}
              :
            </div>

            {nameSpace === DAILY_ARCHIVE_NAMESPACE || nameSpace === IMPORTANT_NAMESPACE ? (
              <div className="detailInfo-content">{data?.path}</div>
            ) : (
              <div className="detailInfo-content">{data?.pathFile}</div>
            )}
          </div>

          <div className="detailInfo">
            <div className="detailInfo-title">
              {intl.formatMessage({
                id: 'view.storage.created_time',
              })}
              :
            </div>

            {nameSpace === DAILY_ARCHIVE_NAMESPACE && (
              <div className="detailInfo-content">
                {moment(data?.createdTime * 1000).format('DD/MM/YYYY')}
              </div>
            )}

            {(nameSpace === CAPTURED_NAMESPACE || nameSpace === EVENT_FILES_NAMESPACE) && (
              <div className="detailInfo-content">
                {moment(data?.createdTime).format('DD/MM/YYYY')}
              </div>
            )}

            {nameSpace === IMPORTANT_NAMESPACE && data.tableName === 'file' && (
              <div className="detailInfo-content">
                {moment(data?.createdTime * 1000).format('DD/MM/YYYY')}
              </div>
            )}

            {nameSpace === IMPORTANT_NAMESPACE && data.tableName === 'event_file' && (
              <div className="detailInfo-content">
                {moment(data?.createdTime).format('DD/MM/YYYY')}
              </div>
            )}

            {nameSpace === EVENT_AI_NAMESPACE && (
              <div className="detailInfo-content">
                {moment(data?.createdTime).format('DD/MM/YYYY')}
              </div>
            )}
          </div>

          <div className="detailInfo">
            <div className="detailInfo-title">
              {intl.formatMessage({
                id: 'view.storage.note',
              })}
              :
            </div>
            <div className="detailInfo-content">
              <Input.TextArea
                name="content"
                className="detailInfo-content__note"
                value={note}
                onChange={handleChangeNote}
                onBlur={(e) => {
                  form.setFieldsValue({
                    content: e.target.value.trim(),
                  });
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  form.setFieldsValue({
                    content: e.clipboardData.getData('text').trim(),
                  });
                }}
              />
            </div>
          </div>

          {(nameSpace === CAPTURED_NAMESPACE ||
            nameSpace === EVENT_FILES_NAMESPACE ||
            (nameSpace === IMPORTANT_NAMESPACE && data?.tableName === 'event_file')) && (
            <div className="detailInfo">
              <div className="detailInfo-title">
                {intl.formatMessage({
                  id: 'view.storage.set_event',
                })}
                :
              </div>
              <div className="detailInfo-content">
                <Select
                  placeholder={intl.formatMessage({
                    id: 'view.category.event_type',
                  })}
                  style={{ maxWidth: '395px', width: '100%' }}
                  onChange={handleChangeEventType}
                  value={eventSelected}
                >
                  {eventList.map((event) => (
                    <Select.Option key={event.id} value={event.uuid}>
                      {event.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          )}
        </Col>
      </Row>
    );
  };

  const renderEventAiNameSpace = () => {
    return (
      <StyledEventFileDetail className="eventDetail4">
        <Col span={14}>
          <div className="err_image">
            {REACT_APP_AI_SOURCE !== AI_SOURCE.PHILONG ? (
              <ul>
                {imageOther
                  ? imageOther.map((item, index) => (
                      <VideoOverlay key={item.uuid}>
                        <div className="imageOther-container">
                          <div className="imageOther-item">
                            {item.uuid !== detailAI.uuid ? (
                              <Popconfirm
                                title={intl.formatMessage({ id: 'noti.sure_to_delete' })}
                                onCancel={(event) => {
                                  event.stopPropagation();
                                }}
                                onConfirm={(event) => {
                                  event.stopPropagation();
                                  // deleteImageHandler(item.uuid);
                                }}
                              >
                                <Button
                                  className="imageOther-btn"
                                  size="small"
                                  type="danger"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                  }}
                                >
                                  <CloseOutlined style={{}} />
                                </Button>
                              </Popconfirm>
                            ) : null}

                            <img
                              onClick={(event) => {
                                event.stopPropagation();
                                // viewImageAIHandler(item);
                              }}
                              className="videoErrorURL-img"
                              src={'data:image/jpeg;base64,' + item.image}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                      </VideoOverlay>
                    ))
                  : null}

                {hasVideo && (
                  <>
                    {videoErrorURL ? (
                      <VideoOverlay>
                        <div className="videoErrorURL-container">
                          <div className="videoErrorURL-item">
                            <div
                              className="img__item"
                              onClick={(event) => {
                                event.stopPropagation();
                                // viewImageAIHandler(videoErrorURL);
                              }}
                            >
                              {videoErrorURL && (
                                <video className="videoErrorURL-video" loop autoPlay>
                                  <source src={videoErrorURL.url} type="video/mp4" />{' '}
                                </video>
                              )}
                            </div>
                          </div>
                        </div>
                      </VideoOverlay>
                    ) : (
                      <VideoOverlay
                      // onClick={downloadVideo}
                      >
                        <div className="videoErrorURL-container">
                          <div className="videoErrorURL-item">
                            <Spin spinning={loading}>
                              <img
                                className="videoErrorURL-img"
                                src={imageOther[0]?.image}
                                alt="Avatar"
                              />
                            </Spin>
                            <PlayCircleOutlined className="play_icon" />
                          </div>
                        </div>
                      </VideoOverlay>
                    )}
                  </>
                )}
              </ul>
            ) : (
              <ul>
                {imageOther
                  ? imageOther.map((item, index) => (
                      <VideoOverlay key={item.id}>
                        <div className="imageOther-container">
                          <div className="imageOther-item">
                            {item.uuid !== detailAI.uuid ? (
                              <Popconfirm
                                title={intl.formatMessage({ id: 'noti.sure_to_delete' })}
                                onCancel={(event) => {
                                  event.stopPropagation();
                                }}
                                onConfirm={(event) => {
                                  event.stopPropagation();
                                  // deleteImageHandler(item.uuid);
                                }}
                              />
                            ) : null}

                            {item.type === 'mp4' ? (
                              <div
                                className="img__item"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  // viewImageAIHandler(item);
                                }}
                              >
                                {/* <video id={item.id} refs="rtsp://10.0.0.66:8554/proxy6" /> */}
                                <Space size="middle">
                                  <Spin
                                    className="video-js"
                                    size="large"
                                    id={'spin-slot-' + item.id}
                                    style={{ display: 'none' }}
                                  />
                                </Space>
                                <video className="imageOther-video" loop autoPlay>
                                  <source src={item.url} type="video/mp4" />
                                </video>
                              </div>
                            ) : (
                              <img
                                onClick={(event) => {
                                  event.stopPropagation();
                                  // viewImageAIHandler(item);
                                }}
                                className="imageOther-img"
                                src={item.image}
                                alt="Avatar"
                              />
                            )}
                          </div>
                        </div>
                      </VideoOverlay>
                    ))
                  : null}

                {hasVideo && (
                  <>
                    {videoErrorURL ? (
                      <VideoOverlay>
                        <div className="videoErrorURL-container">
                          <div className="videoErrorURL-item">
                            <div
                              onClick={(event) => {
                                event.stopPropagation();
                                // viewImageAIHandler(videoErrorURL);
                              }}
                            >
                              {videoErrorURL && (
                                <video className="videoErrorURL-video" loop autoPlay>
                                  <source src={videoErrorURL.url} type="video/mp4" />{' '}
                                </video>
                              )}
                            </div>
                          </div>
                        </div>
                      </VideoOverlay>
                    ) : (
                      <VideoOverlay
                      // onClick={downloadVideo}
                      >
                        <div className="videoErrorURL-container">
                          <div className="videoErrorURL-item">
                            <Spin spinning={loading}>
                              <img
                                className="videoErrorURL-img filter-blur"
                                src={imageOther[0]?.image}
                                alt="Avatar"
                              />
                            </Spin>
                            <PlayCircleOutlined className="play_icon" />
                          </div>
                        </div>
                      </VideoOverlay>
                    )}
                  </>
                )}
              </ul>
            )}
          </div>
        </Col>

        <Col span={10}>
          <Row className="detail-item">
            <Col span={10}>
              <div className="title">
                {intl.formatMessage({ id: 'view.penaltyTicket.vehicle_type' })} :{' '}
              </div>
            </Col>
            <Col span={14}>{detailAI?.vehicleType}</Col>
          </Row>
          <Row className="detail-item">
            <Col span={10}>
              <div className="title">
                {intl.formatMessage({ id: 'view.ai_events.plateNumber' })} :{' '}
              </div>
            </Col>
            <Col span={14}>
              {detailAI.plateNumber
                ? detailAI.plateNumber
                : intl.formatMessage({ id: 'view.ai_events.UnKnow' })}
            </Col>
          </Row>
          <Row className="detail-item">
            <Col span={10}>
              <div className="title">Video :</div>
            </Col>
            <Col span={14}>
              {hasVideo ? (
                <a href={detailAI.videoUrl} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              ) : null}
            </Col>
          </Row>
          <Row className="detail-item">
            <Col span={10}>
              <div className="title">
                {intl.formatMessage({ id: 'view.common_device.state' })} :{' '}
              </div>
            </Col>
            <Col span={14}>
              {detailAI?.status &&
                intl.formatMessage({ id: `view.ai_events.processingStatus.${detailAI.status}` })}
            </Col>
          </Row>
        </Col>
      </StyledEventFileDetail>
    );
  };

  const renderTitleDetail = () => {
    if (nameSpace === EVENT_AI_NAMESPACE) {
      return intl.formatMessage({
        id: 'view.ai_events.err_image',
      });
    }

    return intl.formatMessage({
      id: 'view.storage.detail_information',
    });
  };

  useEffect(() => {
    if (nameSpace === EVENT_AI_NAMESPACE) {
      getTracingEvents();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSpace]);

  useEffect(() => {
    setNote(data.note);
    if (nameSpace === EVENT_AI_NAMESPACE && data != null) {
      let imageOther = [];
      setDetailAI({
        ...data,
      });
      // setProcessState(PROCESSING_STATUS_OPTIONS.find((e) => e.value === data?.status));
      const getViolateUrl = ExportEventFileApi.downloadAIIntegrationFile(
        data.uuid,
        'ImageViolate.jpg',
      );
      const getPlateNumUrl = ExportEventFileApi.downloadAIIntegrationFile(
        data.uuid,
        'ImagePlate.jpg',
      );
      const getVehicleUrl = ExportEventFileApi.downloadAIIntegrationFile(
        data.uuid,
        'ImageVehicle.jpg',
      );

      Promise.all([getViolateUrl, getPlateNumUrl, getVehicleUrl])
        .then(async (value) => {
          if (value[0] instanceof Blob) {
            const blob = new Blob([value[0]], { type: 'octet/stream' });
            imageOther.push({
              id: 'violate',
              fileName: 'ImageViolate.jpg',
              uuid: data.uuid,
              image: URL.createObjectURL(blob),
            });
            setImageViolate(URL.createObjectURL(blob));
          }

          if (value[1] instanceof Blob) {
            const blob = new Blob([value[1]], { type: 'octet/stream' });
            imageOther.push({
              id: 'plate',
              fileName: 'ImagePlate.jpg',
              uuid: data.uuid,
              image: URL.createObjectURL(blob),
            });
            setPlateNumber(URL.createObjectURL(blob));
          }

          if (value[2] instanceof Blob) {
            const blob = new Blob([value[2]], { type: 'octet/stream' });
            imageOther.push({
              id: 'vehicle',
              fileName: 'ImageVehicle.jpg',
              uuid: data.uuid,
              image: URL.createObjectURL(blob),
            });
            setImageVehicle(URL.createObjectURL(blob));
          }
          // if (!isEmpty(value[3])) {
          //   const blob = new Blob([value[3].data], { type: 'octet/stream' });
          //   imageOther.push({
          //     id: 'video',
          //     type: 'mp4',
          //     fileName: 'Video.mp4',
          //     uuid: data.uuid,
          //     url: URL.createObjectURL(blob),
          //   });
          // }
        })
        .then(() => {
          setImageOther(imageOther);
        });
      setImageAICurrent({
        uuid: data.uuid,
        fileName: 'ImageViolate.jpg',
      });

      // else {
      //   setDetailAI({});
      //   if (data && data.uuid != null) {
      //     console.log('data', data);
      //     EventAiAPI.getEventsByTrackingId(data.trackingId).then((data) => {
      //       data.payload.map((ef) => {
      //         if (ef.thumbnailData != null) {
      //           imageOther.push({
      //             image: ef.thumbnailData,
      //             uuid: ef.uuid,
      //             cameraUuid: ef.cameraUuid,
      //             trackingId: ef.trackingId,
      //             fileName: ef.fileName,
      //           });
      //         }
      //       });
      //     });
      //     setImageOther(imageOther);

      //     EventAiAPI.getDetailEvent(data.uuid).then((data) => {
      //       if (data && data.payload) {
      //         setDetailAI({
      //           ...data,
      //           code: data.payload.code,
      //           name: data.payload.name,
      //           position: data.payload.position,
      //           note: data.payload.note,
      //           plateNumber: data.payload.plateNumber,
      //           departmentUuid: data.payload.departmentUuid,
      //           departmentName: data.payload.departmentName,
      //           typeObject: data.payload.useCase === 'zac_vehicle' ? 'vehicle' : 'human',
      //         });
      //         setCurrNode(data?.payload?.note);
      //         // setProcessState(
      //         //   PROCESSING_STATUS_OPTIONS.find((e) => e.value === data?.payload?.status),
      //         // );
      //         setObjectType(
      //           typeObjects.find(
      //             (e) => e.value === (data.payload.useCase === 'zac_vehicle' ? 'vehicle' : 'human'),
      //           ),
      //         );
      //         setImageAICurrent({
      //           cameraUuid: data.cameraUuid,
      //           trackingId: data.trackingId,
      //           uuid: data.uuid,
      //           fileName: data.fileName,
      //         });
      //       }
      //     });
      //   }
      // }
    }

    if (
      nameSpace === EVENT_AI_NAMESPACE &&
      data != null &&
      REACT_APP_AI_SOURCE === AI_SOURCE.PHILONG
    ) {
      getTracingEvents();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, nameSpace]);

  useEffect(() => {
    if (nameSpace === EVENT_AI_NAMESPACE && data.videoUrl) {
      setLoadingDownload(true);
      ExportEventFileApi.downloadAIIntegrationFile(data?.uuid, 'Video.mp4')
        .then((result) => {
          const blob = new Blob([result], { type: 'octet/stream' });
          setVideoErrorURL({
            id: 'video',
            type: 'mp4',
            fileName: 'Video.mp4',
            uuid: detailAI?.uuid,
            url: URL.createObjectURL(blob),
          });
        })
        .finally(() => {
          setLoadingDownload(false);
        });
    }
  }, [nameSpace]);

  return (
    <MSCustomizeDrawerStyled
      title={renderTitle()}
      extra={
        <Space>
          <Button icon={<SaveOutlined />} type="primary" onClick={handleSaveNote}>
            {intl.formatMessage({
              id: 'view.storage.save',
            })}
          </Button>
          <Button icon={<DownloadOutlined />} onClick={handleDownloadFile} loading={loadingDrawer}>
            {intl.formatMessage({
              id: 'view.storage.download_file',
            })}
          </Button>
          <Popconfirm
            placement="bottom"
            title={intl.formatMessage({ id: 'noti.delete' })}
            onConfirm={handleDeleteFile}
            okText={intl.formatMessage({ id: 'view.map.button_accept' })}
            cancelText={intl.formatMessage({ id: 'view.map.button_cancel' })}
          >
            <Button icon={<DeleteOutlined />}>
              {intl.formatMessage({
                id: 'view.storage.delete',
              })}
            </Button>
          </Popconfirm>

          {data.important === false ? (
            <Button icon={<StarOutlined />} onClick={() => handleUpdateFile(true)}>
              {intl.formatMessage({
                id: 'view.storage.tick',
              })}
            </Button>
          ) : (
            <Button icon={<StarOutlined />} onClick={() => handleUpdateFile(false)}>
              {intl.formatMessage({
                id: 'view.storage.untick',
              })}
            </Button>
          )}

          {nameSpace === EVENT_AI_NAMESPACE && (
            <>
              <Button icon={<CreditCardOutlined />} onClick={handleOpenDrawerTicket}>
                {intl.formatMessage({
                  id: 'view.common_device.ticket',
                })}
              </Button>
              <Button icon={<SwapOutlined />}>
                {intl.formatMessage({
                  id: 'view.common_device.move',
                })}
              </Button>
            </>
          )}
        </Space>
      }
      width={'90%'}
      onClose={onClose}
      openDrawer={isOpenView}
    >
      {/* <div className="headerCapture">
        {intl.formatMessage({
          id: 'view.storage.detail_file',
        })}
      </div> */}

      <Spin spinning={loadingDrawer}>
        <CollapseStyled
          expandIconPosition="right"
          ghost={true}
          bordered={false}
          defaultActiveKey={['1']}
        >
          <Panel header={<HeaderPanelStyled>{renderTitleDetail()}</HeaderPanelStyled>} key="1">
            {/* {nameSpace === DAILY_ARCHIVE_NAMESPACE && renderDailyArchiveNameSpace()} */}
            {nameSpace !== EVENT_AI_NAMESPACE && renderDailyArchiveNameSpace()}
            {nameSpace === EVENT_AI_NAMESPACE && renderEventAiNameSpace()}
          </Panel>

          <Panel
            header={
              <HeaderPanelStyled>
                {intl.formatMessage({
                  id: 'view.map.map',
                })}
              </HeaderPanelStyled>
            }
            key="2"
          >
            <Row>
              <Col span={24}>
                <PreviewMap data={detailAI} listLongLat={listLongLat} />
              </Col>
            </Row>
          </Panel>
        </CollapseStyled>

        {/* render video, image */}
        {nameSpace !== EVENT_AI_NAMESPACE && (
          <VideoPlayer
            data={data}
            nameSpace={nameSpace}
            tracingList={tracingList}
            saveUrlSnapshot={saveUrlSnapshot}
            saveFileDownloadFileName={saveFileDownloadFileName}
            handleRefresh={handleRefresh}
          />
        )}

        {nameSpace === EVENT_AI_NAMESPACE &&
        data.hasOwnProperty('videoUrl') &&
        data.videoUrl !== '' ? (
          <div>
            {loadingDownload ? (
              <Spin style={{ margin: '0px auto', width: '100%' }} />
            ) : (
              <div>
                <video
                  style={{
                    width: '100%',
                    height: 'auto',
                    padding: '12px',
                  }}
                  loop
                  autoPlay
                >
                  <source src={videoErrorURL?.url} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        ) : (
          <VideoPlayer
            data={data}
            nameSpace={nameSpace}
            tracingList={tracingList}
            saveUrlSnapshot={saveUrlSnapshot}
            saveFileDownloadFileName={saveFileDownloadFileName}
            handleRefresh={handleRefresh}
          />
        )}

        {/*  */}
        {nameSpace === EVENT_AI_NAMESPACE && (
          <DrawerTicket
            imageViolate={imageViolate}
            plateNumber={plateNumber}
            imageVehicle={imageVehicle}
            data={data}
            isOpenView={openDrawerTicket}
            onClose={handleCloseDrawerTicket}
            onRefresh={handleRefresh}
          />
        )}
      </Spin>
    </MSCustomizeDrawerStyled>
  );
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(DrawerView);
