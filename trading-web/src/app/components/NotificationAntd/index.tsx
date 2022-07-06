import { notification } from 'antd';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdOutlineError } from 'react-icons/md';
import { darkTheme } from 'theme/theme';

const openNotification = (title, description) => {
  notification.open({
    message: title,
    description: description,
    duration: 1.5,
    icon:
      title === 'Success' ? (
        <AiFillCheckCircle style={{ color: darkTheme.greenColor }} />
      ) : (
        <MdOutlineError style={{ color: darkTheme.redColor }} />
      ),
  });
};

export default openNotification;
