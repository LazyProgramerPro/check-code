import { ColLeft, ColRight, Wrapper } from './style';
import FormInput, { FormInputDisabled } from '../FormInput';
import AuthButton from '../AuthButton';
import SliderBar from '../SliderBar';
import { useParams } from 'react-router-dom';
import { getToken } from 'app/components/common/common';
import { Button } from '../LimitForm/style';
const MarketForm = ({ active }) => {
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  return (
    <Wrapper>
      <div className="first-content">
        {active === 'Buy' && (
          <ColLeft>
            <div className="balance">
              <div className="balance-name">Avbl</div>
              <div className="balance-coin">
                - {pair?.substring(findIndex + 1)}
              </div>
            </div>
            <form>
              <FormInputDisabled
                prefix="Price"
                suffix={pair?.substring(findIndex + 1)}
                id="price"
              />
              <FormInput
                prefix="Total"
                suffix={pair?.substring(findIndex + 1)}
                id="amount"
              />
              <SliderBar />
              {getToken() ? (
                <Button
                  data-type="buyButton"
                  id="orderformBuyBtn"
                  type="submit"
                >
                  Buy
                </Button>
              ) : (
                <AuthButton />
              )}
            </form>
          </ColLeft>
        )}

        {active === 'Sell' && (
          <ColRight>
            <div className="balance">
              <div className="balance-name">Avbl</div>
              <div className="balance-coin">
                - {pair?.substring(0, findIndex)}
              </div>
            </div>
            <form>
              <FormInputDisabled
                prefix="Price"
                suffix={pair?.substring(findIndex + 1)}
                id="price-coin"
              />
              <FormInput
                prefix="Amount"
                suffix={pair?.substring(0, findIndex)}
                id="amount-coin"
              />
              <SliderBar />
              {getToken() ? (
                <Button
                  data-type="sellButton"
                  id="orderformSellBtn"
                  type="submit"
                >
                  Sell
                </Button>
              ) : (
                <AuthButton />
              )}
            </form>
          </ColRight>
        )}
      </div>

      <div className="second-content">
        <ColLeft>
          <div className="balance">
            <div className="balance-name">Avbl</div>
            <div className="balance-coin">
              - {pair?.substring(findIndex + 1)}
            </div>
          </div>
          <form>
            <FormInputDisabled
              prefix="Price"
              suffix={pair?.substring(findIndex + 1)}
              id="price"
            />
            <FormInput
              prefix="Total"
              suffix={pair?.substring(findIndex + 1)}
              id="amount"
            />
            <SliderBar />
            {getToken() ? (
              <Button data-type="buyButton" id="orderformBuyBtn" type="submit">
                Buy
              </Button>
            ) : (
              <AuthButton />
            )}
          </form>
        </ColLeft>
        <ColRight>
          <div className="balance">
            <div className="balance-name">Avbl</div>
            <div className="balance-coin">
              - {pair?.substring(0, findIndex)}
            </div>
          </div>
          <form>
            <FormInputDisabled
              prefix="Price"
              suffix={pair?.substring(findIndex + 1)}
              id="price-coin"
            />
            <FormInput
              prefix="Amount"
              suffix={pair?.substring(0, findIndex)}
              id="amount-coin"
            />
            <SliderBar />
            {getToken() ? (
              <Button
                data-type="sellButton"
                id="orderformSellBtn"
                type="submit"
              >
                Sell
              </Button>
            ) : (
              <AuthButton />
            )}
          </form>
        </ColRight>
      </div>
    </Wrapper>
  );
};
export default MarketForm;
