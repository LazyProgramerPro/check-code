import { Button } from 'antd';
import React from 'react';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import styled from 'styled-components';

interface Props {
  mode: 'display' | 'select';
  data: any;
  onClick?: () => void;
  onRemove?: (id: any) => void;
}

function CardPaymentMethod(props: Props) {
  const { mode, data, onClick, onRemove } = props;

  const handleSelectCart = () => {
    if (onClick) {
      onClick();
    }

    return;
  };

  const handleClose = () => {
    if (onRemove) {
      onRemove(data.id);
    }

    return;
  };

  return (
    <Wrapper onClick={handleSelectCart}>
      <div className="cardPM--header">
        <div className="cardPM--payment">{data.bankName}</div>
        {mode === 'display' && (
          <Button
            type="link"
            icon={<AiOutlineClose className="cardPM--icon" />}
            onClick={handleClose}
          ></Button>
        )}

        {mode === 'select' && (
          <Button
            type="link"
            icon={<AiOutlineEdit className="cardPM--icon" />}
          ></Button>
        )}
      </div>

      <div className="cardPM--row">
        <div className="cardPM--label">Full name</div>
        <div className="cardPM--value">{data.fullName}</div>
      </div>

      <div className="cardPM--row">
        <div className="cardPM--label">Mobile phone</div>
        <div className="cardPM--value">{data.mobilePhone}</div>
      </div>
    </Wrapper>
  );
}

export default CardPaymentMethod;

const Wrapper = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.p2pBorder};
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  .cardPM {
    &--payment {
      font-weight: 500;
      font-size: 16px;
    }

    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &--row {
      display: flex;
      padding: 4px 0px;
    }

    &--label {
      width: 120px;
      color: ${({ theme }) => theme.p2pGray};
    }

    &--value {
      font-weight: 500;
      font-size: 16px;
    }

    &--icon {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
