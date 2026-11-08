import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Filter
} from 'lucide-react';

const SAMPLE_CREATORS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    handle: '@sarah.mitchell',
    platform: 'Instagram',
    category: 'Beauty',
    followers: '245K',
    engagement: '3.4%',
    location: 'New York, US',
    email: 'sa***@gmail.com',
    phone: '+1 (212) ••••••',
    avatar: 'https://images.pexels.com/photos/27052949/pexels-photo-27052949.jpeg',
    topAudience: 'Women 18–34 (78%)',
  },
  {
    id: 2,
    name: 'Prince',
    handle: '@prince.fitness',
    platform: 'YouTube',
    category: 'Fitness',
    followers: '185K',
    engagement: '4.2%',
    location: 'Mumbai, IN',
    email: 'pr***@gmail.com',
    phone: '+91 98200 •••••',
    avatar: 'https://images.pexels.com/photos/27130039/pexels-photo-27130039.jpeg',
    topAudience: 'Co-ed 22–35 (64%)',
  },
  {
    id: 3,
    name: 'Anita Sharma',
    handle: '@anita.sharma',
    platform: 'Instagram',
    category: 'Fashion',
    followers: '310K',
    engagement: '2.8%',
    location: 'New Delhi, IN',
    email: 'an***@gmail.com',
    phone: '+91 98110 •••••',
    avatar: 'https://images.pexels.com/photos/40529889/pexels-photo-40529889.jpeg',
    topAudience: 'Fashion & Luxury (81%)',
  },
  {
    id: 4,
    name: 'Marcus Jensen',
    handle: '@marcus.jensen',
    platform: 'YouTube',
    category: 'Tech',
    followers: '92K',
    engagement: '5.6%',
    location: 'Austin, US',
    email: 'ma***@gmail.com',
    phone: '+1 (512) ••••••',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    topAudience: 'Developers & Hardware (71%)',
  },
  {
    id: 5,
    name: 'Sophia Laurent',
    handle: '@sophia.laurent',
    platform: 'TikTok',
    category: 'Lifestyle',
    followers: '510K',
    engagement: '1.9%',
    location: 'Toronto, CA',
    email: 'so***@gmail.com',
    phone: '+1 (416) ••••••',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
    topAudience: 'Urban Gen-Z (69%)',
  },
  {
    id: 6,
    name: 'Liam Turner',
    handle: '@liam.turner',
    platform: 'Instagram',
    category: 'Travel',
    followers: '125K',
    engagement: '3.8%',
    location: 'Sydney, AU',
    email: 'li***@gmail.com',
    phone: '+61 4•• ••••',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80',
    topAudience: 'Global Travelers (75%)',
  },
  {
    id: 7,
    name: 'Chloe Bennett',
    handle: '@chloe.bennett',
    platform: 'TikTok',
    category: 'Beauty',
    followers: '74K',
    engagement: '4.9%',
    location: 'Chicago, US',
    email: 'ch***@gmail.com',
    phone: '+1 (312) ••••••',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&auto=format&fit=crop&q=80',
    topAudience: 'Clean Skincare (84%)',
  },
  {
    id: 8,
    name: 'Daniel Silva',
    handle: '@daniel.silva',
    platform: 'YouTube',
    category: 'Tech',
    followers: '430K',
    engagement: '2.7%',
    location: 'San Francisco, US',
    email: 'da***@gmail.com',
    phone: '+1 (415) ••••••',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    topAudience: 'Hardware & AI (67%)',
  },
  {
    id: 9,
    name: 'Maya Patel',
    handle: '@maya.patel',
    platform: 'Instagram',
    category: 'Fashion',
    followers: '760K',
    engagement: '3.1%',
    location: 'London, UK',
    email: 'ma***@gmail.com',
    phone: '+44 79•• ••••••',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    topAudience: 'High Street Fashion (88%)',
  },
  {
    id: 10,
    name: 'Ryan Walker',
    handle: '@ryan.walker',
    platform: 'TikTok',
    category: 'Lifestyle',
    followers: '63K',
    engagement: '5.1%',
    location: 'Boston, US',
    email: 'ry***@gmail.com',
    phone: '+1 (617) ••••••',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    topAudience: 'Campus Life (74%)',
  },
];

const CATEGORIES = ['All', 'Beauty', 'Fashion', 'Lifestyle', 'Fitness', 'Tech'];
const PLATFORMS = ['All Platforms', 'Instagram', 'YouTube', 'TikTok'];

export default function Brands() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSuiteTab, setActiveSuiteTab] = useState('NFC');

  const filteredCreators = useMemo(() => {
    return SAMPLE_CREATORS.filter((c) => {
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchPlat = selectedPlatform === 'All Platforms' || c.platform === selectedPlatform;
      const matchQuery =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.handle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchPlat && matchQuery;
    });
  }, [selectedCategory, selectedPlatform, searchQuery]);

  const handleNavigateHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-16 lg:pt-18 lg:pb-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-blue-600 block">
                Creator Sourcing for Brands & Agencies
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.15]">
                Find the right creators for your brand.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                Discover relevant talent, evaluate authentic audience demographics, connect with creators, and coordinate high-performing influencer campaigns in one unified system.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={handleNavigateHowItWorks}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs"
                >
                  Explore Creator Network
                </button>
                <Link
                  to="/campaigns"
                  className="px-6 py-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
                >
                  Start a Campaign
                </Link>
              </div>

              <div className="pt-3 flex items-center gap-6 text-xs text-slate-500 font-normal">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  Verified engagement metrics
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
                  Audience authenticity audit
                </span>
              </div>
            </div>

            {/* Right Media Preview */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                <img
                  src="/images/campaign-banners/image.png"
                  alt="InfluencerHub Brand Dashboard"
                  className="w-full h-auto object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- 2. METRICS STRIP ---------------- */}
      <section className="bg-slate-50 border-b border-slate-200/70 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-slate-700 font-medium text-center">
            <span>500+ Active Brands</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span>2,400+ Live Campaigns</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span>15,000+ Registered Creators</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span>80+ Partner Agencies</span>
          </div>
        </div>
      </section>

      {/* ---------------- 3. SUITE OVERVIEW (WITH YOUR REAL IMAGE LINKS) ---------------- */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Brand collaboration in a sleek suite
            </h2>
            <p className="text-sm text-slate-500 font-normal">
              Manage your entire influencer marketing workflow from talent vetting to campaign execution.
            </p>

            <div className="pt-3 flex justify-center">
              <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveSuiteTab('NFC')}
                  className={`px-4 py-1.5 rounded-md transition ${
                    activeSuiteTab === 'NFC' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  Direct Discovery
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSuiteTab('NFC_QR')}
                  className={`px-4 py-1.5 rounded-md transition ${
                    activeSuiteTab === 'NFC_QR' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  Campaign Roster
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200/90 aspect-[4/3] bg-slate-100">
                <img
                  src="https://images.openai.com/static-rsc-4/wzOqTAQ9RH9IV2nD0-9Sez_LLn9EDAA-F-bz_WmYC_UgSXOSzPVZ_ZWetuNKGWj2il_DRBShDAV7QppJVYlfd3tgRqfzZIhzxDQh9QanFiz-ARNl_gpXHkiXkMoa3KzXg7YMeguinEpuCYVjrxMWW8h9Z-X5MmbjSm88R4o2nQ3moRSRceg-fK-qki_Fdw41?purpose=fullsize"
                  alt="Discovery workflow"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Talent Discovery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Search through verified creators based on target geographic distribution, exact niche categorization, and reach.
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Avoid guesswork with historical follower trajectory, average view completion rates, and benchmark values.
              </p>
              <button
                type="button"
                onClick={handleNavigateHowItWorks}
                className="text-xs font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1"
              >
                Check Details →
              </button>
            </div>

            {/* Card 2 */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200/90 aspect-[4/3] bg-slate-100">
                <img
                  src="https://images.openai.com/static-rsc-4/O0p4GfAOS85Ysnp6pl6qlDos6gGSlD7u3dewoXE4QbtTElm2fT7bpo0Rf1IN-5IFnYSTkRBELt7bYOUpQzhN43EBWmyxxLoT8GDW3RM0eP4lniZNmw5FTPrg4X7Q0amWEevVacrfEOXa9B_9TGySXC3iP0M8YgJQJJxlgTYan7fgKFRrS5bjvwNQM0Pn-PFb?purpose=fullsize"
                  alt="Audience metrics analytics"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Audience Audits</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Audit audience credibility with genuine follower ratios, comment toxicity scans, and demographic age brackets.
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Filter out suspicious accounts and bot farms to ensure marketing spend reaches authentic consumers.
              </p>
              <button
                type="button"
                onClick={handleNavigateHowItWorks}
                className="text-xs font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1"
              >
                Check Details →
              </button>
            </div>

            {/* Card 3 */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200/90 aspect-[4/3] bg-slate-100">
                <img
                  src="https://images.openai.com/static-rsc-4/Rrio8sp4xFexdqtWvwR6ZQ3h5xNqG1BkUjO1IFQDNjXvavIeTQ3Ltsw0qHZZFLNoYExwSrqe50S11f9IDQmlOForKDum7as9Qg9DNbLV4uF1OB27lctbEkPCzJPoNWDQNUNXmnLAs7mEuqdwRABAoIhlRWR59pfmF_UaDaW11FjTSoXzVmSv8TDZLKkv6stl?purpose=fullsize"
                  alt="Direct campaign brief collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Direct Outreach</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Directly pitch briefs, deliverables, and usage rights agreements to creator management without intermediate agency markups.
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Centralize your contract discussions, rate negotiations, and content reviews inside one portal.
              </p>
              <button
                type="button"
                onClick={handleNavigateHowItWorks}
                className="text-xs font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1"
              >
                Check Details →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. MAIN FEATURE: CREATOR DISCOVERY DASHBOARD (CENTERED) ---------------- */}
      <section className="py-16 sm:py-20 bg-[#fafafc] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Creator Discovery Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Filter creators across platforms and demographics. Full email and phone numbers require an active brand tier.
            </p>
          </div>

          {/* SaaS Container Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Top Bar Navigation */}
            <div className="border-b border-slate-200 px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                </div>
                <span className="h-4 w-px bg-slate-200 mx-1"></span>
                <span className="font-semibold text-slate-900 text-xs tracking-wide">
                  Discover Creators
                </span>
              </div>

              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
                <button
                  type="button"
                  className="px-3 py-1 rounded-md bg-white text-blue-600 font-semibold shadow-xs"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleNavigateHowItWorks}
                  className="px-3 py-1 rounded-md hover:text-slate-900 transition-colors"
                >
                  Saved Lists
                </button>
                <button
                  type="button"
                  onClick={handleNavigateHowItWorks}
                  className="px-3 py-1 rounded-md hover:text-slate-900 transition-colors"
                >
                  Analytics
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-white space-y-4">
              <div className="grid lg:grid-cols-12 gap-4 items-center">
                
                {/* Search Input */}
                <div className="lg:col-span-4 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search creators, niche, city..."
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-normal"
                  />
                </div>

                {/* Categories */}
                <div className="lg:col-span-5 flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium text-slate-600">
                  <span className="text-slate-400 text-xs mr-1 shrink-0">Niche:</span>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-md shrink-0 transition-colors ${
                        selectedCategory === cat
                          ? 'bg-slate-900 text-white font-medium'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Platforms Filter */}
                <div className="lg:col-span-3 flex items-center justify-end space-x-1.5 text-xs font-medium">
                  <span className="text-slate-400 text-xs mr-1 shrink-0">Platform:</span>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="px-2.5 py-1.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200 text-xs focus:outline-none cursor-pointer"
                  >
                    {PLATFORMS.map((plat) => (
                      <option key={plat} value={plat}>
                        {plat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status and count */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-500 font-normal">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span>Showing {filteredCreators.length} verified creators</span>
                </div>
                <button
                  type="button"
                  onClick={handleNavigateHowItWorks}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Configure Advanced Discovery Filters →
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-400 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 w-10">#</th>
                    <th className="py-3 px-4">Creator Profile</th>
                    <th className="py-3 px-4">Platform</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Followers</th>
                    <th className="py-3 px-4">Engagement</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Direct Email</th>
                    <th className="py-3 px-4">Direct Phone</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {filteredCreators.map((creator, idx) => (
                    <tr
                      key={creator.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-slate-400 text-xs">
                        {idx + 1}
                      </td>

                      {/* Creator Profile */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {creator.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-normal">
                              {creator.handle}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Platform */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-600 font-normal">
                          {creator.platform}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          {creator.category}
                        </span>
                      </td>

                      {/* Followers */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {creator.followers}
                      </td>

                      {/* Engagement */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {creator.engagement}
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-slate-600">
                        {creator.location}
                      </td>

                      {/* Masked Email */}
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                          <span>{creator.email}</span>
                          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                        </div>
                      </td>

                      {/* Masked Phone */}
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                          <span>{creator.phone}</span>
                          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={handleNavigateHowItWorks}
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline px-2.5 py-1 rounded transition"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Upgrade Bar */}
            <div className="bg-slate-900 text-white px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300 font-normal">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  Unlock complete creator profiles, contact information, and advanced discovery with a premium plan.
                </span>
              </div>
              <button
                type="button"
                onClick={handleNavigateHowItWorks}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium transition"
              >
                Upgrade for Access
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- 5. CURATED CREATOR SPOTLIGHT (BIG PROFILES & REAL LINKS) ---------------- */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-wrap items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600 block">
                Audience Profiling
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
                Detailed Creator Profiles at a Glance
              </h2>
            </div>
            <button
              type="button"
              onClick={handleNavigateHowItWorks}
              className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              See all 15K+ creator profiles <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cards Grid with Larger, Highly Visible Avatars */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: 'Sarah Mitchell',
                handle: '@sarah.mitchell',
                category: 'Beauty & Skincare',
                followers: '245K',
                engagement: '3.4%',
                topAudience: 'Women 18–34 (78%)',
                image: 'https://images.pexels.com/photos/27052949/pexels-photo-27052949.jpeg',
              },
              {
                id: 2,
                name: 'Prince',
                handle: '@prince.fitness',
                category: 'Fitness & Health',
                followers: '185K',
                engagement: '4.2%',
                topAudience: 'Co-ed 22–35 (64%)',
                image: 'https://images.pexels.com/photos/27130039/pexels-photo-27130039.jpeg',
              },
              {
                id: 3,
                name: 'Anita Sharma',
                handle: '@anita.sharma',
                category: 'Fashion & Luxury',
                followers: '310K',
                engagement: '2.8%',
                topAudience: 'Fashion Enthusiasts (81%)',
                image: 'https://images.pexels.com/photos/40529889/pexels-photo-40529889.jpeg',
              },
            ].map((creator) => (
              <div
                key={creator.id}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Top user row with larger, clear avatar */}
                  <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <img
                        src={creator.image}
                        alt={creator.name}
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                      />
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                          {creator.name}
                        </h4>
                        <p className="text-xs text-slate-400 font-normal mt-0.5">
                          {creator.handle}
                        </p>
                        <div className="mt-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium text-slate-700 bg-slate-100">
                            {creator.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2-column metrics box without green tones */}
                  <div className="grid grid-cols-2 py-4 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
                        Followers
                      </span>
                      <span className="text-xl font-semibold text-slate-900 tracking-tight mt-1 block">
                        {creator.followers}
                      </span>
                    </div>
                    <div className="border-l border-slate-100 pl-4">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
                        Engagement
                      </span>
                      <span className="text-xl font-semibold text-slate-900 tracking-tight mt-1 block">
                        {creator.engagement}
                      </span>
                    </div>
                  </div>

                  {/* Metadata fields */}
                  <div className="py-4 space-y-2.5 border-b border-slate-100 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-normal">Core Demographic</span>
                      <span className="font-medium text-slate-800">{creator.topAudience}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-normal">Direct Contact</span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded text-[11px]">
                        <Lock className="w-3 h-3 text-slate-400" /> Locked via Tier
                      </span>
                    </div>
                  </div>
                </div>

                {/* Outline button */}
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={handleNavigateHowItWorks}
                    className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold tracking-tight transition text-center shadow-xs"
                  >
                    View Full Profile & Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- 6. OUR PROCESS ---------------- */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Steps */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Our Process
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal max-w-lg">
                We work deliberately to design the cleanest collaboration experience, guiding your marketing team step by step through creator discovery, vetting, and campaign delivery.
              </p>

              <div className="space-y-3.5 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-4">
                  <span className="font-semibold text-slate-900 w-4 text-right">1</span>
                  <p className="font-normal text-slate-700">You define target niches, geographic focus, and campaign scope.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-semibold text-slate-900 w-4 text-right">2</span>
                  <p className="font-normal text-slate-700">You filter creators by authenticated engagement and verified audience fit.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-semibold text-slate-900 w-4 text-right">3</span>
                  <p className="font-normal text-slate-700">You review shortlisted creator profiles and past content performance.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-semibold text-slate-900 w-4 text-right">4</span>
                  <p className="font-normal text-slate-700">Direct contact credentials and verified emails are unlocked.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-semibold text-slate-900 w-4 text-right">5</span>
                  <p className="font-normal text-slate-700">Campaign briefs are dispatched directly to creators or representation.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-semibold text-slate-900 w-4 text-right">6</span>
                  <p className="font-normal text-slate-700">Deliverables are submitted, reviewed, and published on schedule.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNavigateHowItWorks}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  Learn more about our verification process →
                </button>
              </div>
            </div>

            {/* Right Framed Process Image */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1000&auto=format&fit=crop&q=80"
                  alt="Marketing team review and creator process"
                  className="w-full h-80 sm:h-96 object-cover rounded-xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- 7. COLLABORATIVE WORKSPACE ---------------- */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Mockup Card */}
            <div className="lg:col-span-6">
              <div className="max-w-md mx-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
                  <span className="font-normal text-slate-600"># campaign-brief-q3</span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">Active Roster</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <img
                      src="https://images.pexels.com/photos/27052949/pexels-photo-27052949.jpeg"
                      alt="Sarah Mitchell"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">Sarah Mitchell <span className="font-normal text-slate-400 text-[11px]">10:15 AM</span></p>
                      <p className="text-slate-600 mt-0.5">Story draft reviewed. Will publish the unboxing video Thursday at 6 PM EST.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img
                      src="https://images.pexels.com/photos/40529889/pexels-photo-40529889.jpeg"
                      alt="Anita Sharma"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">Anita Sharma <span className="font-normal text-slate-400 text-[11px]">11:20 AM</span></p>
                      <p className="text-slate-600 mt-0.5">Usage rights agreement confirmed for 60 days on paid social channels.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Deliverables Status</span>
                    <span className="text-slate-900 font-semibold">2 of 3 Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight leading-snug">
                A collaborative workspace for the whole team.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Most influencer communications remain trapped inside individual email threads or external direct messages.
                InfluencerHub enables marketing coordinators, brand directors, and media agencies to track creator briefs, contracts, and scheduled deliverables from a shared single source of truth.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNavigateHowItWorks}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium transition"
                >
                  Explore Team Collaboration →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- 8. PREMIUM SUBSCRIPTION TIER ---------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#091122] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium uppercase tracking-wider">
                Enterprise Data Access
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Unlock the full creator network
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Gain direct access to verified creator emails, mobile contacts, historical ROI benchmarks, and exportable audience demographic files.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
              <button
                type="button"
                onClick={handleNavigateHowItWorks}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition shadow-sm"
              >
                Explore Pricing & Access
              </button>
              <Link
                to="/campaigns"
                className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-200 font-medium text-sm transition"
              >
                Post Campaign Brief
              </Link>
            </div>

            <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

    </div>
  );
}