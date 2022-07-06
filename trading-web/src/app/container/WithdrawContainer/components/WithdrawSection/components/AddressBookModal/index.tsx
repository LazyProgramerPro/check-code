import { StyledAddressBookModal } from '../../style';
import { useTranslation } from 'react-i18next';
const ModalSelectAddressBook = ({
  handleAddressBookModalCancel,
  isAddressBookModalVisible,
}) => {
  const { t } = useTranslation();
  return (
    <StyledAddressBookModal
      title={t('select-form-address-book')}
      visible={isAddressBookModalVisible}
      onCancel={handleAddressBookModalCancel}
      footer={null}
    ></StyledAddressBookModal>
  );
};
export default ModalSelectAddressBook;
