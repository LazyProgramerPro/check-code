import FormInput from '../../../FormInput';
import AuthButton from '../../../AuthButton';
import { useForm } from 'react-hook-form';
import SliderBar from '../../../SliderBar';
import { getToken } from 'app/components/common/common';
import { Button } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import { useSellspotlimitSlice } from './slice';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { selectOrderbook } from 'app/components/OrderBook/slice/selectors';
import { useTranslation } from 'react-i18next';

//declare type
type SubmitForm = {
  price: number;
  amount: number;
  total: number;
};
const SellForm = ({ baseSymbol, quoteSymbol, baseAvlb, wallet, type }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { actions } = useSellspotlimitSlice();
  const selectPrice: any = useSelector(selectOrderbook);
  const [percent, setPercent] = useState(0);
  //Validate
  const validation = Yup.object().shape({
    price: Yup.number()
      .required('Invalid price')
      .min(0, 'Price must be greater than 0')
      .typeError('Invalid price')
      .nullable(true),
    amount: Yup.number()
      .required('Invalid amount')
      .min(0, 'Amount must be greater than 0')
      .max(baseAvlb, `Max amount ${baseAvlb}.`)
      .typeError('Invalid amount')
      .nullable(true),
    total: Yup.number()
      .required('Invalid total')
      .min(0, 'Total must be greater than 0')
      .typeError('Invalid total')
      .nullable(true),
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SubmitForm>({
    resolver: yupResolver(validation),
  });
  const price = getValues('price');
  const amount = getValues('amount');
  // getvalues slider
  const onChangeSlider = (value: number) => {
    setPercent(value);
    if (baseAvlb === 0) {
      setValue('amount', 0, { shouldValidate: true });
      setValue('total', 0, { shouldValidate: true });
    } else {
      setValue('amount', (value * baseAvlb) / 100, { shouldValidate: true });
      setValue('total', ((value * baseAvlb) / 100) * price, {
        shouldValidate: true,
      });
    }
  };
  // getvalues Price
  const onChangePrice = (value: number) => {
    setValue('total', parseFloat((value * amount).toFixed(8)), {
      shouldValidate: true,
    });
  };
  // getvalues Amount
  const onChangeAmount = (value: number) => {
    setValue('total', parseFloat((value * price).toFixed(8)), {
      shouldValidate: true,
    });
    if (baseAvlb === 0) {
      setPercent(100);
    } else {
      setPercent((value / baseAvlb) * 100);
    }
  };
  // getvalues Total
  const onChangeTotal = (value: number) => {
    setValue('amount', value / price, { shouldValidate: true });
    if (baseAvlb === 0) {
      setPercent(100);
    } else {
      setPercent((value * 100) / baseAvlb);
    }
  };
  useEffect(() => {
    if (selectPrice?.selectPrice > 0) {
      setValue('price', selectPrice?.selectPrice, {
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPrice?.selectPrice]);
  // submit form
  const onSubmitSell = (data: any) => {
    const payload = {
      ...data,
      pair_id: localStorage.getItem('pair_id'),
      type: type,
      stop: null,
      limit: null,
    };
    dispatch(actions.sellspotlimitRequest(payload));
  };
  return (
    <form onSubmit={handleSubmit(onSubmitSell)}>
      <Tooltip color={'#000'} title={errors.price?.message}>
        <div>
          <FormInput
            prefix={t('price')}
            suffix={quoteSymbol}
            id="price-sell"
            error={errors.price?.message}
            regis={register('price', {
              onChange: e => onChangePrice(e.target.value),
            })}
          />
        </div>
      </Tooltip>
      <Tooltip
        color={'#000'}
        placement="topRight"
        title={errors.amount?.message}
      >
        <div>
          <FormInput
            prefix={t('amount')}
            suffix={baseSymbol}
            id="amount-sell"
            error={errors.amount?.message}
            regis={register('amount', {
              onChange: e => onChangeAmount(e.target.value),
            })}
          />
        </div>
      </Tooltip>
      <SliderBar change={onChangeSlider} defaultpercent={percent} />
      {getToken() ? (
        <Tooltip color={'#000'} title={errors?.total?.message}>
          <div>
            <FormInput
              prefix={t('total')}
              suffix={quoteSymbol}
              id="total-sell"
              error={errors.total?.message}
              regis={register('total', {
                onChange: e => onChangeTotal(e.target.value),
              })}
            />
          </div>
        </Tooltip>
      ) : (
        ''
      )}
      {getToken() ? (
        <Button data-type="sellButton" id="orderformSellBtn" type="submit">
          {t('sell')} {baseSymbol}
        </Button>
      ) : (
        <AuthButton />
      )}
    </form>
  );
};
export default SellForm;
