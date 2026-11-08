import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users2, UserCheck, Layers, BarChart3, Target } from 'lucide-react';

const navItems = [
  { to: '/collector', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/collector/creators', label: 'Creators', icon: Users2 },
  { to: '/collector/team', label: 'Team', icon: UserCheck },
  { to: '/collector/submissions', label: 'Submissions', icon: Layers },
  { to: '/collector/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function CollectorLayout() {
  return (
    <div className="min-h-screen bg-[#f4f7fc] text-[#1e293b] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e5e9f2] flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30">
        <div>
          {/* Brand Monogram Header */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-[#f1f4f9]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/20">
              C
            </div>
            <div>
              <p className="font-extrabold text-[17px] text-[#0f172a] tracking-tight leading-none">CreatorHub</p>
              <p className="text-[12px] font-semibold text-slate-400 mt-1">Influencer Collection</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Collector Navigation">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Team Goal Card */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-[#f8faff] to-[#edf3ff] border border-blue-100/80">
          <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" /> Team Goal
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900 tracking-tight">1,400 <span className="text-sm font-semibold text-slate-400">/ 2,000</span></p>
          <div className="w-full bg-blue-200/50 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: '70%' }} />
          </div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mt-2">
            <span>This Month</span>
            <span className="text-blue-600 font-bold">70%</span>
          </div>
        </div>
      </aside>

      {/* Main View Shell */}
      <div className="flex-1 ml-64 min-w-0 flex flex-col">
        <main className="flex-1 p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}