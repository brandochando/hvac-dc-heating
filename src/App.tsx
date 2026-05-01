import CustomCursor from "./components/ui/CustomCursor";
import { UtilityBar, Header, Hero, TrustBar, Testimonials } from "./components/layout/LandingParts";
import {
  Services,
  Specials,
  Guarantee,
  BeforeAfter,
  FinancingPromo,
  ServiceAreas,
} from "./components/sections/ServiceParts";
import { FAQ, ContactForm, Footer, MobileCtaBar } from "./components/sections/FooterParts";

export default function App() {
  return (
    <div className="relative">
      <a href="#main" className="skip-link">Skip to main content</a>
      <CustomCursor />

      <UtilityBar />
      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />

        <TrustBar />

        <Services />

        <Specials />

        <Guarantee />

        <BeforeAfter />

        <FinancingPromo />

        <Testimonials />

        <ServiceAreas />

        <FAQ />

        <ContactForm />
      </main>

      <Footer />

      <MobileCtaBar />
    </div>
  );
}
