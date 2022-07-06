import styled from 'styled-components';
import { ToastContainer } from 'react-bootstrap';

export const StyledToastContainer = styled(ToastContainer)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  opacity: 1;
  transition: all 0.5s ease-out;
`;
