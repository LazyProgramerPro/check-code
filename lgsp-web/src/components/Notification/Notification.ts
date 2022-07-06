import { notification } from 'antd';

export const NotificationInfo = (title: string, message: string) => {
  notification.open({
    message: title,
    description: message,
    placement: 'topRight',
  });
};

export const NotificationSuccess = (title: string, message: string) => {
  notification.open({
    message: title,
    description: message,
    placement: 'topRight',
    style: {
      borderLeft: '5px solid green',
    },
  });
};

export const NotificationError = (title: string, message: string) => {
  notification.open({
    message: title,
    description: message,
    placement: 'topRight',
    style: {
      borderLeft: '5px solid red',
    },
  });
};
