import ClientSteps from "./components/ClientSteps";
import CompaniesShowcase from "./components/CompaniesShowcase";
import CredibilitySection from "./components/credibilitySection";
import Cto from "./components/Cto";
import DeveloperSteps from "./components/DeveloperSteps";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";

const Home = () => {
  return (
    <>
      <div className="sm:px-6 lg:px-8 space-y-12 md:space-y-20 
                bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
        <HeroSection />
        <CredibilitySection />
        <ClientSteps />
        <DeveloperSteps />
        <CompaniesShowcase />
        <Testimonials />
        <Cto />
      </div>

    </>
  );
};

export default Home;
