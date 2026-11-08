import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import Logo from './Logo';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://adrovis-influencer-backend.onrender.com';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerGroups = [
  {
    title: 'Discover',
    links: [
      ['Explore campaigns', '/campaigns'],
      ['Discover brands', '/brands'],
      ['How it works', '/how-it-works'],
      ['Creator community', '/for-creators'],
    ],
  },
  {
    title: 'For Creators',
    links: [
      ['Join as creator', '/signup?role=creator'],
      ['Creator Pricing', '/creator-pricing'],
      ['Paid collaborations', '/campaigns?type=PAID'],
      ['Barter campaigns', '/campaigns?type=BARTER'],
    ],
  },
  {
    title: 'For Brands',
    links: [
      ['Join as brand', '/signup?role=brand'],
      ['Find creators', '/brands'],
      ['Submit brief', '/#inquiry'],
      ['Contact team', '/#inquiry'],
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/' },
  { label: 'YouTube', icon: YoutubeIcon, href: 'https://www.youtube.com/' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleSubscribe = async (event) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || submitting) return;

    setSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch(`${API_BASE}/api/v1/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      if (!res.ok) throw new Error('Subscription failed');

      setStatus({ type: 'success', message: 'Subscribed. Welcome to Brand Collabz.' });
      setEmail('');
    } catch {
      setStatus({ type: 'error', message: 'Unable to subscribe. Please try again.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus({ type: null, message: '' }), 5000);
    }
  };

  return (
    <footer className="border-t border-slate-200/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12 lg:gap-10">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-3">
            <div className="[&_a]:text-white [&_svg]:text-white inline-block">
              <Logo />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm">
              Connecting forward-thinking brands with authentic creators to build impactful, data-backed influencer partnerships.
            </p>
            <div className="pt-1">
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Join the platform <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-2 md:col-span-5 lg:col-span-5 grid grid-cols-3 gap-4 sm:gap-6">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">
                  {group.title}
                </h4>
                <ul className="space-y-2 text-xs">
                  {group.links.map(([label, to]) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-slate-400 hover:text-white transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">
              Stay in the loop
            </h4>
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              Standout campaigns and creator market insights in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-2.5 py-1 text-xs text-white placeholder:text-slate-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium transition shrink-0 disabled:opacity-60"
                >
                  {submitting ? '...' : 'Join'}
                </button>
              </div>

              {status.type === 'success' && (
                <p className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  {status.message}
                </p>
              )}

              {status.type === 'error' && (
                <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {status.message}
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>© {new Date().getFullYear()} Brand Collabz. All rights reserved.</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <a href="#inquiry" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}