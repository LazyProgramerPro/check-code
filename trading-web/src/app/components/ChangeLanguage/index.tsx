import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { LanguageName, Option, StyledModal } from './style';
import { useTranslation } from 'react-i18next';

const ChangeLanguage = () => {
  const [show, setShow] = useState(false);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const LanguageList = [
    {
      key: 'English',
      name: 'English',
    },
    {
      key: 'Spain',
      name: 'Spain',
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function changeLanguage(e) {
    i18n.changeLanguage(e);
    handleClose();
  }
  return (
    <>
      <LanguageName onClick={handleShow}>{i18n.language}</LanguageName>
      <StyledModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton>
          <div className="modal-title">{t('lang-region')}</div>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body--title">{t('choose-lang-region')}</div>
          <div className="d-flex align-items-center modal-body--list">
            {LanguageList.map(item => (
              <Option
                data-type={item.key === i18n.language && 'active'}
                key={item.key}
                onClick={() => changeLanguage(item.key)}
              >
                {item.name}
              </Option>
            ))}
          </div>
        </Modal.Body>
      </StyledModal>
    </>
  );
};
export default ChangeLanguage;
