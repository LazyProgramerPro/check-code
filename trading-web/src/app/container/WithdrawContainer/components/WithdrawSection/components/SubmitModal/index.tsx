import { StyledSubmitModal } from '../../style';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
const ModalSubmit = ({
  isSubmitModalVisible,
  handleSubmitModalCancel,
  submitForm,
  receiveAmount,
  coinName,
  fee,
  address,
  networkName,
  icon,
}) => {
  const { t } = useTranslation();
  return (
    <StyledSubmitModal
      title={t('security-verificattion')}
      visible={isSubmitModalVisible}
      onCancel={handleSubmitModalCancel}
      footer={null}
      width={600}
    >
      <div className="transition-detail">
        <Row className="mb-2">
          <Col md={3} className="title">
            Amount
          </Col>
          <Col>
            <img
              src={icon}
              width="20"
              height="20"
              alt="icon"
              className="icon-coin"
            />
            Receive {receiveAmount} {coinName} (Network fee {fee} {coinName})
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={3} className="title">
            Address
          </Col>
          <Col>{address}</Col>
        </Row>
        <Row>
          <Col md={3} className="title">
            NetWork
          </Col>
          <Col>{networkName}</Col>
        </Row>
      </div>

      <button
        className="submit-btn"
        onClick={() => {
          handleSubmitModalCancel();
          submitForm();
        }}
      >
        Submit
      </button>
    </StyledSubmitModal>
  );
};
export default ModalSubmit;
