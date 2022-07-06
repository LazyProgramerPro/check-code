import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  background-color: ${({ theme }) => theme.backgroundAccordion};
  -webkit-box-pack: center;
  justify-content: center;
  border-bottom: ${({ theme }) => theme.borderGray};
  @media only screen and (max-width: 575px) {
    display: none;
  }
`;
export const Div = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  width: 100%;
  max-width: 1444px;
`;
export const Content = styled.div`
  box-sizing: border-box;
  margin: 0px 8px 0px 0px;
  min-width: 0px;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  flex-wrap: wrap;
  -webkit-box-flex: 1;
  flex-grow: 1;
  user-select: none;
  align-items: center;
  .content-item {
    flex-basis: 33.333%;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    font-size: 12px;
    line-height: 24px;
    padding-left: 24px;
    padding-right: 24px;
    text-align: left;
    text-decoration: none;
    color: ${({ theme }) => theme.grayColor};
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
    .title {
      box-sizing: border-box;
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .notification {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      flex-shrink: 0;
    }
  }

  @media only screen and (max-width: 911px) {
    .content-item {
      flex-basis: 100%;
    }
  }
`;

export const StyledArrow = styled.div<{ Show: boolean }>`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  color: ${({ theme }) => theme.grayColor};
  flex-shrink: 0;
  align-self: flex-start;
  position: relative;
  top: 16px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  transform: ${props => (props.Show ? 'rotate(270deg)' : 'rotate(90deg)')};
  margin-right: 15px;
  svg {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    color: currentcolor;
    font-size: 16px;
    fill: currentcolor;
    width: 1em;
    height: 1em;
  }
`;
