import { useState, useEffect } from "react";
import { StickyBar } from "@/components/StickyBar";
import { HeroSection } from "@/components/HeroSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SecondCTA } from "@/components/SecondCTA";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { InfiniteGridBg } from "@/components/ui/the-infinite-grid";

const Index = () => {
  const { theme, toggle } = useTheme();
  const [gateData, setGateData] = useState<{ imie: string; email: string; telefon: string } | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleGateSubmit = (data: { imie: string; email: string; telefon: string }) => {
    setGateData(data);
  };

  const openRegistration = () => setShowRegistration(true);
  const closeRegistration = () => setShowRegistration(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("zapisz") === "1") {
      setShowRegistration(true);
    }
    if (params.get("odblokowane") === "1") {
      setGateData({ imie: "", email: "", telefon: "" });
    }
  }, []);

  return (
    <InfiniteGridBg className="min-h-screen bg-background">
      <StickyBar onOpenRegistration={openRegistration} theme={theme} onToggleTheme={toggle} />
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>
      <HeroSection onGateSubmit={handleGateSubmit} gateData={gateData} onOpenRegistration={openRegistration} />
      <ComparisonTable />
      <SecondCTA onOpenRegistration={openRegistration} />
      <RegistrationForm prefill={gateData} isOpen={showRegistration} onClose={closeRegistration} />
      <RegistrationForm prefill={gateData} />
      <Footer />
    </InfiniteGridBg>
  );
};

export default Index;
