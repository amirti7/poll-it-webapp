import WelcomeDiv from "../components/WelcomeDiv";
import NavigationBar from "../components/NavigationBar";
import StepsDiv from "../components/StepsDiv";
import StickyFooter from "../components/StickyFooter";
import Testimonials from "../components/Testimonials";

const HomePage = (props) => {
  return (
    <div>
      <NavigationBar />
      <WelcomeDiv />
      <StepsDiv />
      <Testimonials />
      <StickyFooter />
    </div>
  );
};

export default HomePage;
