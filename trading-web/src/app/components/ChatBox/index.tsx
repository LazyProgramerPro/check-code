/* eslint-disable react-hooks/exhaustive-deps */
import { Container, ChatHeader, ChatMessage, ChatFooter } from './style';
import { useEffect, useState, Fragment } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Upload, Image, Avatar, Modal } from 'antd';
import { IoMdSend, IoMdAttach } from 'react-icons/io';
import axios from 'axios';
import { useChatboxSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatbox } from './slice/selectors';
import InfiniteScroll from 'react-infinite-scroll-component';

import moment from 'moment';
const Chatpage = ({ email, data }) => {
  const accessToken = localStorage.getItem('access_token');
  const baseWsURL = process.env.REACT_APP_BASE_CHAT_WEBSOCKET_URL;
  const baseUploadURL: any = process.env.REACT_APP_BASE_CHAT_URL;
  const dispatch = useDispatch();
  const { actions } = useChatboxSlice();
  const ChatState = useSelector(selectChatbox);
  const [socket, setSocket]: any = useState();
  const [mess, setMess]: any = useState('');
  const [listMess, setListMess]: any = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList]: any = useState([]);
  const [hasMore, setHasMore]: any = useState(false);
  const { Dragger } = Upload;
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  // useEffect(() => {
  //   dispatch(actions.setTs(new Date().getTime()));
  // }, [data]);
  useEffect(() => {
    if (email !== undefined && email?.trim() !== '') {
      const data = {
        email: email,
        page: ChatState?.pageIndex,
        size: ChatState?.pageSize,
        ts: ChatState?.ts,
      };
      dispatch(actions.getMessageRequest(data));
    }
    return () => {
      dispatch(actions.setTs(new Date().getTime()));
    };
  }, [email, ChatState.pageIndex, data]);
  useEffect(() => {
    if (listMess.length >= ChatState.totalMessage) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [ChatState.totalMessage, listMess]);
  useEffect(() => {
    if (email !== undefined && email?.trim() !== '') {
      const Websocket = new ReconnectingWebSocket(
        `${baseWsURL}?token=${accessToken}`,
        [],
        {
          connectionTimeout: 5000,
        },
      );
      setSocket(Websocket);
      Websocket.onopen = () => {
        console.log('chat connected');
        setInterval(
          () =>
            Websocket.send(
              JSON.stringify({
                method: 'GET_PROPERTY',
                id: Math.random(),
              }),
            ),
          5000,
        );
      };
      Websocket.onclose = () => {
        console.log('Chat WebSocket Closed!');
      };
      Websocket.onmessage = (message: any) => {
        const Message = JSON.parse(message.data);
        if (
          Message.user_id === data?.buyEmail ||
          Message.user_id === data?.sellEmail
        ) {
          setListMess(prev => [Message, ...prev]);
        }
      };
      return () => {
        Websocket.close();
        setListMess([]);
        dispatch(actions.getMessageSuccess([]));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  useEffect(() => {
    if (listMess?.length > 0) {
      setListMess(prev => [...prev, ...ChatState?.listMessage]);
    } else {
      setListMess(ChatState?.listMessage);
    }
  }, [ChatState?.listMessage]);
  const handleSendMsg = e => {
    console.log(e);
    e.stopPropagation();
    if (mess?.trim() !== '' && fileList?.length > 0) {
      const data = {
        token: accessToken,
        to: email,
        msg: mess,
        img: fileList?.map(item => {
          return item?.response?.url;
        }),
      };
      if (socket) {
        socket.send(JSON.stringify(data));
        setMess('');
        setFileList([]);
      }
    } else if (mess?.trim() !== '') {
      const data = {
        token: accessToken,
        to: email,
        msg: mess,
        // img: postImage.myFile,
      };
      if (socket) {
        socket.send(JSON.stringify(data));
        setMess('');
      }
    } else if (fileList?.length > 0) {
      console.log(fileList);
      const data = {
        token: accessToken,
        to: email,
        // msg: mess,
        img: fileList?.map(item => {
          return item?.response?.url;
        }),
      };
      if (socket) {
        socket.send(JSON.stringify(data));
        setFileList([]);
      }
    }
  };
  const hanldeEnterPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSendMsg(e);
    }
  };
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };
  const handleChange = file => {
    console.log(file);
    setFileList(file.fileList);
  };
  const handleRemove = file => {
    const str = file?.response?.url.indexOf('uploaded/');
    dispatch(
      actions.removeUploadImgRequest(file?.response?.url.slice(str + 9)),
    );
  };
  async function handlePaste(event) {
    var items = event.clipboardData.items;
    const clipboardItems = [].slice.call(items).filter(function (item: any) {
      // Filter the image items only
      return item?.type.indexOf('image') !== -1;
    });
    console.log(clipboardItems);
    if (clipboardItems.length === 0) {
      return;
    }
    const item: any = clipboardItems[0];
    const blob = item.getAsFile();
    console.log(blob);
    // setBolaos(URL.createObjectURL(blob));
    const blobbase64 = await getBase64(blob);
    handleChange({
      file: {
        originFileObj: blob,
        lastModified: blob.lastModified,
        lastModifiedDate: blob.lastModifiedDate,
        name: blob.name,
        size: blob.size,
        // status: 'uploading',
        thumbUrl: blobbase64,
        type: 'image/png',
      },
      fileList: [
        ...fileList,
        {
          originFileObj: blob,
          lastModified: blob.lastModified,
          lastModifiedDate: blob.lastModifiedDate,
          name: blob.name,
          size: blob.size,
          // status: 'uploading',
          thumbUrl: blobbase64,
          type: 'image/png',
        },
      ],
    });
  }
  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `${accessToken}`,
      },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        // setProgress(percent);
        if (percent === 100) {
          // setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('file', file);
    try {
      const res = await axios.post(
        `${baseUploadURL}/file/upload`,
        fmData,
        config,
      );
      onSuccess(res.data);
      // console.log('server res: ', res);
    } catch (err) {
      // console.log('Eroor: ', err);
      // const error = new Error('Some error');
      onError({ err });
    }
  };

  const propUpload = {
    action: baseUploadURL,
    fileList: fileList,
    showUploadList: false,
    multiple: true,
    maxCount: 8,
    customRequest: uploadImage,
    openFileDialogOnClick: false,
    accept: 'image/*',
    beforeUpload: (file: any) => {
      const isImage =
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/gif' ||
        file.type === 'image/ico';
      if (!isImage) {
        alert(`${file.name} is not a image file`);
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onPreview: handlePreview,
    onChange: handleChange,
    onRemove: handleRemove,
  };
  const handleLoadmore = () => {
    dispatch(actions.changePageIndex());
  };
  return (
    <Container onPaste={handlePaste}>
      <div className="wrapper">
        <ChatHeader>
          <div className="partner-infomation">
            <div className="item">
              <Avatar style={{ verticalAlign: 'middle' }} size={40}>
                {email?.trim()?.charAt(0)?.toUpperCase()}
              </Avatar>
              <div className="item-wrapper">
                <div className="name">{email}</div>
                <div className="subname">{email}</div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="partner-desc">
            <div className="item">
              <div className="item-title">30d Trades</div>
              <div className="item-value">{data?.partner?.orderIn30Day}</div>
            </div>
            <div className="item">
              <div className="item-title">30d Completion Rate</div>
              <div className="item-value">
                {data?.partner?.rateComplete?.toFixed(2)} %
              </div>
            </div>
            <div></div>
          </div>
        </ChatHeader>
        <ChatMessage>
          <Dragger {...propUpload}>
            <div id="message">
              <InfiniteScroll
                dataLength={listMess.length}
                next={handleLoadmore}
                hasMore={hasMore}
                inverse={true}
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  overflow: 'visible',
                }}
                loader={<h4>Loading...</h4>}
                scrollableTarget="message"
              >
                {listMess.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item?.user_id === email ? (
                        <div className="patient">
                          <Avatar
                            style={{ verticalAlign: 'middle' }}
                            size={24}
                            className="avt"
                          >
                            {item?.user_id?.trim()?.charAt(0)?.toUpperCase()}
                          </Avatar>
                          <div className="msg">
                            {item?.msg && (
                              <div className="text">
                                <span>{item.msg}</span>
                              </div>
                            )}
                            <div className="img-wrapper">
                              {item?.img?.length > 0 &&
                                item?.img?.map((image, index) => {
                                  return (
                                    <Image
                                      src={image}
                                      alt=""
                                      className="image"
                                      key={index}
                                    />
                                  );
                                })}
                            </div>
                            <div className="time">
                              {moment(item?.ts).format('HH:mm DD/MM/YYYY')}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mine">
                          <div className="msg">
                            <div>
                              {item?.msg && (
                                <div className="text">
                                  <span>{item.msg}</span>
                                </div>
                              )}
                            </div>
                            {item?.img?.length > 0 &&
                              item?.img?.map((image, index) => {
                                return (
                                  <div className="img-wrapper">
                                    <Image
                                      src={image}
                                      alt=""
                                      className="image"
                                      key={index}
                                    />
                                  </div>
                                );
                              })}
                            <div className="time">
                              {moment(item?.ts).format('HH:mm DD/MM/YYYY')}
                            </div>
                          </div>
                          <Avatar
                            style={{ verticalAlign: 'middle' }}
                            size={24}
                            className="avt"
                          >
                            {item?.user_id?.trim()?.charAt(0)?.toUpperCase()}
                          </Avatar>
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </InfiniteScroll>
            </div>
          </Dragger>
        </ChatMessage>
        <ChatFooter>
          <Dragger {...propUpload}>
            <div onClick={e => e.stopPropagation()} className="image-preview">
              <Upload
                {...propUpload}
                showUploadList={true}
                listType="picture-card"
              ></Upload>
            </div>
            <div className="group" onClick={e => e.stopPropagation()}>
              <div className="inputgroup">
                <input
                  className="inputfield"
                  value={mess}
                  autoFocus
                  onKeyPress={e => hanldeEnterPress(e)}
                  onChange={e => setMess(e.target.value)}
                />
              </div>
              <Upload {...propUpload} openFileDialogOnClick={true}>
                <IoMdAttach className="upload-btn" />
              </Upload>
              <span className="send-btn" onClick={e => handleSendMsg(e)}>
                <IoMdSend />
              </span>
            </div>
          </Dragger>
        </ChatFooter>
      </div>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Container>
  );
};
export default Chatpage;
