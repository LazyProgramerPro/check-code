import styled from 'styled-components';
const AuthFooter = () => {
  return (
    <>
      <Div>© 2017 - 2022 ByteBuffer.com. All rights reserved</Div>
    </>
  );
};
export default AuthFooter;
export const Div = styled.div`
  margin: 0;
  min-width: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #b7bdc6;
  text-align: center;
  padding: 12px;
`;
