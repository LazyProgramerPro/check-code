import styled from 'styled-components';
interface ContainerProps {
  prefix: any;
  suffix: any;
  id: string;
  Change?: any;
  regis?: any;
  error?: string;
}
const FormInput = (props: ContainerProps) => {
  const { prefix, suffix, id, regis, error } = props;
  return (
    <>
      <Container data-type={prefix === 'Total' ? 'totalForm' : 'normal'}>
        <Div data-status={error ? 'error' : 'normal'}>
          <div className="input-prefix">
            <label htmlFor={id}>{prefix}</label>
          </div>
          <input
            id={id}
            className="inputtext"
            type="number"
            step="0.00001"
            {...regis}
          />
          <div className="input-suffix">
            <label htmlFor={id}>{suffix}</label>
          </div>
        </Div>
      </Container>
    </>
  );
};
export default FormInput;
export const FormInputDisabled = (props: ContainerProps) => {
  const { prefix, suffix, id } = props;
  return (
    <Container>
      <Div className="input-disabled">
        <div className="input-prefix">
          <label htmlFor={id}>{prefix}</label>
        </div>
        <input
          id={id}
          className="inputtext"
          type="number"
          min="0.0001"
          step="0.0001"
          disabled
          placeholder="Market"
        />
        <div className="input-suffix">
          <label htmlFor={id}>{suffix}</label>
        </div>
      </Div>
    </Container>
  );
};
export const Container = styled.div`
  margin: 16px 0px 8px;
  min-width: 0px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  background-color: rgba(43, 47, 54, 0.9);
  .input-disabled {
    border-color: ${({ theme }) => theme.darkBrightGrayColor};
    background-color: ${({ theme }) => theme.darkBrightGrayColor};
    &:hover {
      border-color: ${({ theme }) => theme.darkBrightGrayColor};
    }
    input {
      cursor: default;
    }
  }
  &[data-type='normal'] {
    margin: 0px 0 12px;
  }
`;
export const Div = styled.div`
  margin: 0px;
  min-width: 0px;
  display: inline-flex;
  position: relative;
  -webkit-box-align: center;
  align-items: center;
  line-height: 1.6;
  border: 1px solid rgba(43, 47, 54, 0.8);
  border-radius: 4px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
  &[data-status='error'] {
    border-color: ${({ theme }) => theme.errorColor};
    }
  .inputtext {
    color: ${({ theme }) => theme.matteWhiteColor};
    font-size: 14px;
    padding: 0 6px 0 4px;
    text-align: right;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    outline: none;
    background-color: inherit;
    opacity: 1;
    border: none !important;
}
  }
  .input-prefix {
    flex-shrink: 0;
    margin-left: 8px;
    min-width: 48px;
    font-size: 14px;
    color: ${({ theme }) => theme.colorDescription};
    label {
      margin: 0px;
      min-width: 0px;
      font-size: 14px;
      color: ${({ theme }) => theme.grayColor};
      display: inline-block;
      text-align: right;
    }
  }
  .input-suffix {
    flex-shrink: 0;
    margin-right: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.grayColor};
    label {
      margin: 0px;
      min-width: 0px;
      font-size: 14px;
      color: ${({ theme }) => theme.matteWhiteColor};
      display: inline-block;
      text-align: right;
    }
  }
`;
