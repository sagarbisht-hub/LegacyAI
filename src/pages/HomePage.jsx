import React from 'react'
import HeroSection from '../components/HeroSection'
import ProblemSection from '../components/ProblemSection'
import AboutSection from '../components/AboutSection'
import HowItWorks from '../components/HowItWorks'
import FeaturesSection from '../components/FeaturesSection'
import RoleSection from '../components/RoleSection'
import CompanyRegistrationForm from '../components/CompanyRegistrationForm'
import HelpSection from '../components/HelpSection'
import ContactSection from '../components/ContactSection'
import CTASection from '../components/CTASection'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ProblemSection />
      <AboutSection />
      <HowItWorks />
      <FeaturesSection />
      <RoleSection />
      <CompanyRegistrationForm />
      <HelpSection />
      <ContactSection />
      <CTASection />
    </main>
  )
}
