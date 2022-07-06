import NavMenu from 'app/components/Navbar';
import WarningAlert from 'app/components/Alert';
import AccordionNav from 'app/components/Accordion';
import DataViewContainer from 'app/container/HomeContainer/DataViewContainer';
import TradeFormContainer from 'app/container/TradeFormContainer';
const HomeContainer = () => {
  return (
    <>
      <header>
        <NavMenu></NavMenu>
        <WarningAlert></WarningAlert>
        <AccordionNav></AccordionNav>
      </header>
      <DataViewContainer></DataViewContainer>
      <TradeFormContainer></TradeFormContainer>
    </>
  );
};

export default HomeContainer;
