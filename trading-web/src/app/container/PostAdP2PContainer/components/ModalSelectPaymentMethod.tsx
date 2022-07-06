import { Button, Modal, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { postAdP2PServices } from 'services/postAdP2PService';
import styled from 'styled-components';
import CardPaymentMethod from './CardPaymentMethod';
import { PlusOutlined, UndoOutlined } from '@ant-design/icons';

interface Props {
  visible: boolean;
  handleCancel: () => void;
  handleSelect: (paymentID: any, payment: any) => void;
  paymentMethodSelected: any[];
}

function ModalSelectPaymentMethod(props: Props) {
  const { visible, handleCancel, handleSelect, paymentMethodSelected } = props;

  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectPayment = (value: any) => {
    handleSelect(value.id, value);
    handleCancel();
  };

  const handleGetAllPaymentP2P = () => {
    setLoading(true);
    postAdP2PServices
      .getAllPaymentP2PService()
      .then(res => {
        if (res.data.rc !== 0) {
          return;
        }

        setPayments(res.data.rows);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (visible === false) return;

    handleGetAllPaymentP2P();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      title="Select payment method"
      footer={false}
    >
      <Wrapper>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {payments?.map((payment, i) => {
              if (paymentMethodSelected.includes(payment.id)) {
                return null;
              }

              return (
                <CardPaymentMethod
                  mode="select"
                  key={i}
                  data={payment}
                  onClick={() => {
                    handleSelectPayment(payment);
                  }}
                />
              );
            })}
          </>
        )}

        <div className="selectPM-containerButton">
          <Button className="selectPM-btn" icon={<PlusOutlined />}>
            Add New
          </Button>
          <Button className="selectPM-btn" icon={<UndoOutlined />}>
            Refresh
          </Button>
        </div>
      </Wrapper>
    </Modal>
  );
}

export default ModalSelectPaymentMethod;

const Wrapper = styled.div`
  .selectPM-containerButton {
    display: flex;
    justify-content: space-between;
  }

  .selectPM-btn {
    display: flex;
    align-items: center;
  }
`;
