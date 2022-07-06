import styled from 'styled-components';
export const Container = styled.div`
  min-width: 0px;
  width: 100%;
  margin: 0px 0px 12px;
  display: flex;
`;
export const SliderContainer = styled.div`
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 14px);
  margin-left: 7px;
  height: 25px;
  display: flex;
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    padding: 0px;
    outline: none;
    opacity: 0.7;
    margin: 0px;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    .ant-slider-rail {
      height: 5px;
    }
    .ant-slider-track {
      height: 5px;
      background-color: ${({ theme }) => theme.primary};
    }
    &:hover {
      opacity: 1;
    }
  }
  .ant-slider-handle {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    transform: translateX(-50%) rotate(45deg) !important;
    background-color: ${({ theme }) => theme.backgroundDropdown};
    border-radius: 4px;
    border: 4px solid ${({ theme }) => theme.colorDescription};
    z-index: 20;
    cursor: grab;
    transition: box-shadow 0.2s ease 0s;
    &::after {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      border: 2px solid ${({ theme }) => theme.background};
      border-radius: 4px;
      background: transparent;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .ant-slider-dot {
    box-sizing: content-box;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.backgroundFooter};
    color: ${({ theme }) => theme.grayColor};
    width: 6px;
    height: 6px;
    border-radius: 2px;
    border: 2px solid ${({ theme }) => theme.darkBrightGrayColor};
    &:hover {
      border-color: ${({ theme }) => theme.background};
      background-color: ${({ theme }) => theme.darkBrightGrayColor};
    }
  }
  .ant-slider-disabled .ant-slider-handle,
  .ant-slider-disabled .ant-slider-dot {
    border-color: ${({ theme }) => theme.darkBrightGrayColor} !important;
  }
`;
