import React, { useEffect } from 'react';
import { Form, Input, Switch } from 'antd';
import { changeCachingValue, changeEnableCaching } from '../redux/actions/runtime_configuration_data';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { validateNumber } from 'src/constants/common';
const mapState = (rootState: RootState) => ({
  dataState: rootState.apiRuntimeConfiguration.dataState,
});

const connector = connect(mapState, {
  changeEnableCaching,
  changeCachingValue,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux, FormComponentProps {}
const ResponseCachingLayout = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;
  const onChangeCachingInput = (e: any) => {
    try {
      const cacheValue: number = parseInt(e.target.value);
      props.changeCachingValue(cacheValue);
    } catch (err) {}
  };

  const onChangeEnableCaching = (e: any) => {
    props.changeEnableCaching();
  };

  useEffect(() => {
    resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataState.flag_reload]);
  console.log(props.dataState.flag_reload);
  const validateNumberInput = (rule: any, text: any, callback: any) => {
    const isValid: boolean = validateNumber(text.trim());
    if (!isValid && text.trim().length !== 0) {
      return callback('Cache Timeout không hợp lệ');
    } else {
      props.form.setFields({
        time: {
          value: text.trim(),
        },
      });
      return callback();
    }
  };

  const pasteTime = () => {
    const valueRow = props.form.getFieldValue('time');
    props.form.setFields({
      time: {
        value: valueRow.trim(),
      },
    });
  };
  return (
    <>
      <h3>Response</h3>
      <div
        style={{
          border: '1px solid #f9f9f9',
          borderRadius: '10px',
          boxShadow: '#c9c3c359 0px 5px 15px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <div style={{ margin: '10px 0px 20px 0' }}>
          <div style={{ width: '90%', marginLeft: '5%', display: 'flex', margin: 'auto' }}>
            <h3 style={{ width: '90%' }}>Response Caching</h3>
            <div style={{ width: '10%' }}>
              <Switch checked={props.dataState.data.enabledCaching} onChange={onChangeEnableCaching} />
            </div>
          </div>
          {props.dataState.data.enabledCaching ? (
            <div style={{ width: '90%', marginLeft: '5%', marginTop: '-10px' }}>
              <Form>
                <Form.Item>
                  {getFieldDecorator('time', {
                    initialValue: props.dataState.data.cacheTimeout,
                    validateTrigger: 'onBlur',
                    rules: [{ validator: validateNumberInput }],
                  })(
                    <Input
                      maxLength={255}
                      onChange={onChangeCachingInput}
                      style={{ border: 'none', borderBottom: '1px solid gray', width: '30%', outline: 'none' }}
                      onPaste={pasteTime}
                    />,
                  )}
                </Form.Item>
              </Form>
              <div style={{ color: 'lightgray', marginTop: '-15px' }}>Cache Timeout (Giây)</div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default connector(Form.create<IProps>()(ResponseCachingLayout));
