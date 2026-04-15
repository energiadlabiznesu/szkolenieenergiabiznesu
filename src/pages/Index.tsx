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
  const [showRegistration, setShowRegistration] = useState(false);

  const openRegistration = () => setShowRegistration(true);
  const closeRegistration = () => setShowRegistration(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("zapisz") === "1") {
      setShowRegistration(true);
    }
  }, []);

  return (
    <InfiniteGridBg className="min-h-screen bg-background">
      <StickyBar onOpenRegistration={openRegistration} theme={theme} onToggleTheme={toggle} />
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>
      <HeroSection onOpenRegistration={openRegistration} />
      <ComparisonTable />
      <SecondCTA onOpenRegistration={openRegistration} />
      <RegistrationForm prefill={null} isOpen={showRegistration} onClose={closeRegistration} />
      <RegistrationForm prefill={null} />
      <Footer />
    </InfiniteGridBg>
  );
};

export default Index;
