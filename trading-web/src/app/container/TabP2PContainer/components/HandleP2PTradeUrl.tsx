import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useTabP2PSlice } from '../slice';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';

function HandleP2PTradeUrl() {
  const navigate = useNavigate();
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);

  const [searchParams] = useSearchParams();
  const P2PSearchParams = Object.fromEntries(searchParams);

  const { actions } = useTabP2PSlice();
  const dispatch = useDispatch();

  // FOLLOW STORE
  useEffect(() => {
    const param: any = {
      action: TabP2PState.searchParam.action,
      crypto: TabP2PState.searchParam.crypto,
      fiat: TabP2PState.searchParam.fiat,
      payment: TabP2PState.searchParam.payment,
    };
    navigate({
      pathname: '/trade-p2p/p2p/',
      search: `?${createSearchParams(param)}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabP2PState.searchParam]);

  // FOLLOW URL -> DISPATCH TO STORE FIRST TIME
  useEffect(() => {
    const param = {
      action: P2PSearchParams.action || 'buy',
      crypto: P2PSearchParams.crypto || 'BTC',
      fiat: P2PSearchParams.fiat || '',
      payment: P2PSearchParams.payment || '',
    };

    dispatch(actions.upTabP2P(param));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default HandleP2PTradeUrl;
