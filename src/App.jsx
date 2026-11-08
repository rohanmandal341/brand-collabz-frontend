import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import Brands from './pages/Brands';
import HowItWorks from './pages/HowItWorks';
import ForCreators from './pages/ForCreators';
import NotFound from './pages/NotFound';

import Pricing from './pages/CreatorPricing';

import AdminLayout from './admin/AdminLayout';
import OverviewPage from './collector/OverviewPage';
import CreatorsPage from './collector/CreatorsPage';
import TeamPage from './admin/TeamPage';
import AgenciesPage from './admin/AgenciesPage';
import PayloadPage from './admin/PayloadPage';
import AnalyticsDashboardPage from './admin/AnalyticsDashboardPage';
import InquiriesPage from './admin/InquiriesPage';
import NewsletterPage from './admin/NewsletterPage';

import {
  LoginPage, SignupPage, ForgotPasswordPage,
  ResetPasswordPage, VerifyEmailPage, OnboardingPage,
} from './auth/AuthExperience';
import RoleDashboard from './auth/RoleDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function OnboardingRoute() {
  const { pathname } = useLocation();
  const role = pathname.split('/').filter(Boolean).pop();
  if (!['creator', 'brand', 'agency'].includes(role)) return <Navigate to="/signup" replace />;
  return <OnboardingPage role={role} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Authentication and role-specific onboarding */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/onboarding/:role" element={<OnboardingRoute />} />
        <Route path="/dashboard/:role" element={<RoleDashboard />} />

        {/* Existing admin / collector routes - preserved */}
      <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<OverviewPage />} />
  <Route path="analytics" element={<AnalyticsDashboardPage />} />
  <Route path="inquiries" element={<InquiriesPage />} />
  <Route path="newsletter" element={<NewsletterPage />} />
  <Route path="creators" element={<CreatorsPage />} />
  <Route path="team" element={<TeamPage />} />
  <Route path="submissions" element={<PayloadPage />} />
  <Route path="agencies" element={<AgenciesPage />} />
  <Route path="payload" element={<PayloadPage />} />
</Route>

        {/* Existing public website routes - preserved */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/creator-pricing" element={<Pricing />} />
          <Route path="/brand-pricing" element={<HowItWorks />} />
          <Route path="/for-creators" element={<ForCreators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
