import { ColLeft, ColRight } from './style';
import FormInput from '../FormInput';
import AuthButton from '../AuthButton';
import SliderBar from '../SliderBar';
import { useParams } from 'react-router-dom';
const OCOForm = () => {
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  return (
    <>
      <ColLeft>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">- {pair?.substring(findIndex + 1)}</div>
        </div>
        <form>
          <FormInput
            prefix="Price"
            suffix={pair?.substring(findIndex + 1)}
            id="price"
          />
          <FormInput
            prefix="Stop"
            suffix={pair?.substring(findIndex + 1)}
            id="stop"
          />
          <FormInput
            prefix="Limit"
            suffix={pair?.substring(findIndex + 1)}
            id="limit"
          />
          <FormInput
            prefix="Amount"
            suffix={pair?.substring(0, findIndex)}
            id="amount"
          />
          <SliderBar />
          <AuthButton />
        </form>
      </ColLeft>
      <ColRight>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">- {pair?.substring(0, findIndex)}</div>
        </div>
        <form>
          <FormInput
            prefix="Price"
            suffix={pair?.substring(findIndex + 1)}
            id="price-coin"
          />
          <FormInput
            prefix="Stop"
            suffix={pair?.substring(findIndex + 1)}
            id="stop-coin"
          />
          <FormInput
            prefix="Limit"
            suffix={pair?.substring(findIndex + 1)}
            id="limit-coin"
          />
          <FormInput
            prefix="Amount"
            suffix={pair?.substring(0, findIndex)}
            id="amount-coin"
          />
          <SliderBar />
          <AuthButton />
        </form>
      </ColRight>
    </>
  );
};
export default OCOForm;
