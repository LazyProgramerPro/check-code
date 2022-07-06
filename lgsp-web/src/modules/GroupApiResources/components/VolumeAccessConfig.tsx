import React from 'react';
import { Field, FieldProps } from 'formik';
import MyRadioButton from 'src/components/customField/Radio';
import SelectField from 'src/components/customField/SelectField';
import { POLICES, RATE_LIMIT_LEVEL } from 'src/constants/common';

type IVolumeConfig = FieldProps<any>;

const VolumeAccessConfig = (props: IVolumeConfig) => {
  const {
    form: { values },
  } = props;
  const volumeConfig = values.volumeConfig;
  console.log('volumeConfigvolumeConfigvolumeConfig', volumeConfig);

  return (
    <div className="volume-access-config">
      <div className="title">Cấu hình dung lượng truy cập</div>
      <div className="box-content-config">
        <div className="rate-limit-level-item">
          <div className="label">Version mới là mặc định</div>
          <Field name="volumeConfig.apiLevel" options={RATE_LIMIT_LEVEL} component={MyRadioButton} formItem={false} />
        </div>
        {volumeConfig.apiLevel && (
          <div className="rate-limit-policies-item">
            <div className="label">Rate limiting policies</div>
            <Field isMulti={false} name="volumeConfig.policy" options={POLICES} component={SelectField} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VolumeAccessConfig;
