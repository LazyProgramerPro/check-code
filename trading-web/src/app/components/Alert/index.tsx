import { useState } from 'react';
import { StyledAlert, StyledAlertLink, Wrapper } from './style';
import IconSvg from 'app/assets/img/icon';

import { BiChevronRight } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
const WarningAlert = () => {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  if (show) {
    return (
      <Wrapper>
        <AiOutlineClose className="btn-close" onClick={() => setShow(false)} />
        {show && (
          <StyledAlert>
            <IconSvg name="alert" />
            {t('alert-home')}
            <StyledAlertLink href="#">
              {t('view-more')}
              <BiChevronRight />
            </StyledAlertLink>
          </StyledAlert>
        )}
      </Wrapper>
    );
  } else {
    return null;
  }
};
export default WarningAlert;
