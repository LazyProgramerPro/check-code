import { StyledSuccessToast, StyledErrorToast } from './style';
import { Toast } from 'react-bootstrap';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { MdError } from 'react-icons/md';

export const SuccessToast = ({ close, show, title, message }: any) => {
  return (
    <StyledSuccessToast onClose={close} show={show} delay={3000} autohide>
      <Toast.Header>
        <IoCheckmarkDoneCircleSharp className="icon-success" />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </StyledSuccessToast>
  );
};
export const ErrorToast = ({ close, show, title, message }: any) => {
  return (
    <StyledErrorToast onClose={close} show={show} delay={3000} autohide>
      <Toast.Header>
        <MdError className="icon-error" />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </StyledErrorToast>
  );
};
