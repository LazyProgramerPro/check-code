import React, { useEffect, useMemo } from 'react';
import mpi_logo from '../../assets/images/logo-footer.png';
import location_icon from '../../assets/icons/location.svg';
import phone_icon from '../../assets/icons/phone.svg';
import fax_icon from '../../assets/icons/fax.svg';
import email_icon from '../../assets/icons/email.svg';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getContentFooterPage } from 'src/modules/Homepage/redux/actions';
import { getAddressInforSelector } from 'src/modules/Homepage/redux/selector/footer';

export const Footer = function() {
  const selectFooterState = useAppSelector(state => state.mainPage.footer.data);
  const selectSystemInfor = useAppSelector(getAddressInforSelector);
  const dispatch = useAppDispatch();
  const AddressInfor = useMemo(() => selectSystemInfor, [selectSystemInfor]) || selectFooterState;

  useEffect(() => {
    dispatch(getContentFooterPage({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="homepage-footer-wrapper">
      <div className="homepage-footer">
        <div className="hp-footer--logo">
          <img src={mpi_logo} />
        </div>
        <div className="hp-footer--infor">
          <div className="hp-footer--header">
            <h4>BỘ KẾ HOẠCH VÀ ĐẦU TƯ</h4>
          </div>
          <div className="hp-footer--contact">
            <ul>
              <li style={{ marginBottom: '12px' }}>
                <img style={{ height: '14px' }} src={location_icon} />
                <span> {AddressInfor?.address}</span>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <img style={{ height: '14px' }} src={phone_icon} />
                <span>{AddressInfor?.telephone}</span>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <img style={{ height: '14px' }} src={fax_icon} />
                <span>{AddressInfor?.fax}</span>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <img style={{ height: '14px' }} src={email_icon} />
                <span>{AddressInfor?.email} </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
