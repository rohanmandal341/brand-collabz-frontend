import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

const linkClass = ({ isActive }) =>
  `text-[14px] font-medium transition-colors ${
    isActive ? 'text-blue-600' : 'text-slate-700 hover:text-slate-900'
  }`;

function DropdownItem({ to, href, title, desc }) {
  const cls =
    'block rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50';
  const inner = (
    <>
      <span className="block text-[13px] font-medium text-slate-900">{title}</span>
      <span className="mt-0.5 block text-xs font-normal text-slate-500">{desc}</span>
    </>
  );
  return href ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <Link to={to} className={cls}>{inner}</Link>
  );
}

export default function Navbar() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openPricing, setOpenPricing] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();
  const signUpRef = useRef(null);
  const pricingRef = useRef(null);
  const resourcesRef = useRef(null);

  useEffect(() => {
    setOpenSignUp(false);
    setOpenPricing(false);
    setOpenResources(false);
    setMobileMenu(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (signUpRef.current && !signUpRef.current.contains(e.target)) setOpenSignUp(false);
      if (pricingRef.current && !pricingRef.current.contains(e.target)) setOpenPricing(false);
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) setOpenResources(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenu]);

  const toggle = (setter) => () => {
    const all = [setOpenSignUp, setOpenPricing, setOpenResources];
    all.forEach((s) => (s === setter ? s((v) => !v) : s(false)));
  };

  const menuPanel =
    'absolute mt-3 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        .bc-nav {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <div className="bc-nav mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[68px] lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-base font-semibold text-white">
            B
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-slate-900">
            Brand Collabz
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/campaigns" className={linkClass}>Campaigns</NavLink>
          <NavLink to="/for-creators" className={linkClass}>For Creators</NavLink>
          <NavLink to="/brands" className={linkClass}>For Brands</NavLink>

          {/* Resources */}
          <div ref={resourcesRef} className="relative">
            <button
              type="button"
              onClick={toggle(setOpenResources)}
              className={`flex items-center gap-1 text-[14px] font-medium transition-colors ${
                openResources ? 'text-blue-600' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Resources
              <ChevronDown className={`h-4 w-4 transition-transform ${openResources ? 'rotate-180' : ''}`} />
            </button>
            {openResources && (
              <div className={`${menuPanel} left-0 w-60`}>
                <DropdownItem to="/brand-pricing" title="Brand Workflow" desc="How it works for brands" />
                <DropdownItem to="/creator-pricing" title="Creator Workflow" desc="How it works for creators" />
                <DropdownItem href="mailto:contact@brandcollabz.in" title="Support" desc="contact@brandcollabz.in" />
              </div>
            )}
          </div>

          {/* Pricing */}
          <div ref={pricingRef} className="relative">
            <button
              type="button"
              onClick={toggle(setOpenPricing)}
              className={`flex items-center gap-1 text-[14px] font-medium transition-colors ${
                openPricing ? 'text-blue-600' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Pricing
              <ChevronDown className={`h-4 w-4 transition-transform ${openPricing ? 'rotate-180' : ''}`} />
            </button>
            {openPricing && (
              <div className={`${menuPanel} left-0 w-64`}>
                <DropdownItem to="/creator-pricing" title="For Creators" desc="Free 50 applies/day and Pro" />
                <DropdownItem to="/brand-pricing" title="For Brands & Agencies" desc="Publishing and contact plans" />
              </div>
            )}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-[14px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Log In
          </Link>

          <div ref={signUpRef} className="relative">
            <button
              type="button"
              onClick={toggle(setOpenSignUp)}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-blue-600 px-4 text-[14px] font-medium text-white transition-colors hover:bg-blue-700"
            >
              Get Started
              <ChevronDown className={`h-4 w-4 transition-transform ${openSignUp ? 'rotate-180' : ''}`} />
            </button>
            {openSignUp && (
              <div className={`${menuPanel} right-0 w-64`}>
                <DropdownItem to="/signup?role=creator" title="I'm a creator" desc="Apply to brand campaigns" />
                <DropdownItem to="/signup?role=brand" title="I'm a brand" desc="Post campaigns and hire creators" />
                <DropdownItem to="/signup?role=agency" title="I'm an agency" desc="Manage client rosters" />
                <div className="my-1 border-t border-slate-100" />
                <Link
                  to="/signup"
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] font-medium text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Choose on next screen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenu((v) => !v)}
          aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 md:hidden"
        >
          {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenu && (
        <div className="bc-nav fixed inset-x-0 top-16 flex h-[calc(100dvh-64px)] flex-col justify-between overflow-y-auto border-t border-slate-200 bg-white px-5 py-6 md:hidden">
          <nav className="flex flex-col">
            {[
              ['/', 'Home'],
              ['/campaigns', 'Campaigns'],
              ['/for-creators', 'For Creators'],
              ['/brands', 'For Brands'],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="border-b border-slate-100 py-3.5 text-[15px] font-medium text-slate-900"
              >
                {label}
              </Link>
            ))}

            <p className="mb-1 mt-6 text-xs font-medium uppercase tracking-wider text-slate-400">
              Pricing
            </p>
            <Link to="/creator-pricing" className="flex items-center justify-between border-b border-slate-100 py-3.5 text-[15px] font-medium text-slate-900">
              For Creators <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link to="/brand-pricing" className="flex items-center justify-between border-b border-slate-100 py-3.5 text-[15px] font-medium text-slate-900">
              For Brands & Agencies <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>

            <p className="mb-1 mt-6 text-xs font-medium uppercase tracking-wider text-slate-400">
              Resources
            </p>
            <a href="mailto:contact@brandcollabz.in" className="py-3.5 text-[15px] font-medium text-slate-900">
              Support
            </a>
          </nav>

          <div className="space-y-2.5 pb-6 pt-6">
            <Link
              to="/login"
              className="flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 text-sm font-medium text-slate-900"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
            >
              Create Account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}