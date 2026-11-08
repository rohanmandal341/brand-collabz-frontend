import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Inbox, 
  Mail, 
  Users2, 
  Users, 
  Layers, 
  Building2, 
  Braces,
  Target
} from 'lucide-react';
import { fetchDashboardOverview } from '../services/collectorApi';

const navItems = [
  { to: '/admin', label: 'Overview', icon: Home, end: true },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { to: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { to: '/admin/creators', label: 'Creators', icon: Users2 },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/submissions', label: 'Submissions', icon: Layers },
  { to: '/admin/agencies', label: 'Agencies', icon: Building2 },
  { to: '/admin/payload', label: 'Payload', icon: Braces },
];

export default function AdminLayout() {
  const [goal, setGoal] = useState({ current: 1400, target: 2000, percentage: 70 });

  useEffect(() => {
    fetchDashboardOverview('THIS_MONTH')
      .then((data) => {
        if (data?.teamGoal) {
          setGoal({
            current: data.teamGoal.current ?? 1400,
            target: data.teamGoal.target ?? 2000,
            percentage: data.teamGoal.percentage ?? 70,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#1e293b] flex font-sans antialiased">
      {/* Sidebar (Fixed 248px) */}
      <aside className="w-[248px] bg-white border-r border-[#e8ecf4] flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="h-[74px] flex items-center gap-3 px-6 border-b border-[#f4f7fc]">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-base flex items-center justify-center shadow-sm shadow-blue-500/20">
              B
            </div>
            <div>
              <p className="font-bold text-[15px] text-slate-900 leading-none tracking-tight">Brand Collabz</p>
              <p className="text-[11px] text-slate-400 font-normal mt-1">Admin Operations</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1" aria-label="Sidebar Navigation">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] transition-colors ${
                    isActive
                      ? 'bg-[#eef4ff] text-[#2563eb] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-normal'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Team Goal Widget */}
        <div className="p-4 m-3.5 rounded-2xl bg-gradient-to-b from-[#f9fbff] to-[#edf3ff] border border-blue-100/80">
          <div className="flex items-center gap-2 text-blue-700 text-[11px] font-semibold">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>Monthly Target</span>
          </div>

          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              {goal.current.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-normal">
              / {goal.target.toLocaleString()}
            </span>
          </div>

          <div className="w-full bg-blue-200/50 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, goal.percentage)}%` }} 
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-medium">
            <span>This Month</span>
            <span className="text-blue-600 font-semibold">{goal.percentage}%</span>
          </div>
        </div>
      </aside>

      {/* Main View Shell */}
      <div className="flex-1 ml-[248px] min-w-0 flex flex-col">
        <main className="flex-1 p-6 sm:p-8 max-w-[1520px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}