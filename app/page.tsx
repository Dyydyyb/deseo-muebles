"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { QuoteStepperSection } from "@/components/QuoteStepperSection";
import { ClosingAndFooter } from "@/components/ClosingAndFooter";
import type { ServiceId } from "@/lib/config";

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<ServiceId>("Cocina");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection onSelectService={setSelectedService} />
        <ProjectsGallery onSelectService={setSelectedService} />
        <WhyChooseSection />
        <ProcessSection />
        <ReviewsSection />
        <QuoteStepperSection selectedService={selectedService} />
      </main>
      <ClosingAndFooter />
    </>
  );
}
