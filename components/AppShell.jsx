"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import IntroLoader from "@/components/IntroLoader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function AppShell({ children }) {
  // null = "haven't checked sessionStorage yet" — avoids a flash of the
  // loader on client-side route changes where it shouldn't show at all.
  const [showLoader, setShowLoader] = useState(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("dbk-intro-seen");
    setShowLoader(!seen);
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("dbk-intro-seen", "1");
    setShowLoader(false);
  };

  return (
    <>
      <SmoothScrollProvider>
        {showLoader && <IntroLoader onComplete={handleLoaderComplete} />}
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </SmoothScrollProvider>
    </>
  );
}
