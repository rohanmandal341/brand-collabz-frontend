import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authService } from "./authService";
import "./auth.css";

export default function RoleDashboard() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let alive = true;
    authService
      .currentUser()
      .then((u) => {
        if (!alive) return;
        if (!u) navigate("/login", { replace: true });
        else if (u.role !== role) navigate(u.onboardingComplete ? `/dashboard/${u.role}` : `/onboarding/${u.role}`, { replace: true });
        else if (!u.onboardingComplete) navigate(`/onboarding/${u.role}`, { replace: true });
        else setUser(u);
      })
      .catch(() => alive && navigate("/login", { replace: true }));
    return () => { alive = false; };
  }, [role, navigate]);

  if (!user) return <div className="demo-dashboard-loading">Loading your workspace…</div>;
  const title = role === "creator" ? "Creator workspace" : role === "brand" ? "Brand workspace" : "Agency workspace";

  return (
    <main className="demo-dashboard">
      <header className="demo-dashboard-header">
        <div className="adrovis-mark"><span className="adrovis-symbol">a</span><span>adrovis</span></div>
        <button
          className="auth-secondary"
          onClick={async () => { await authService.logout(); navigate("/login", { replace: true }); }}
        >
          Log out
        </button>
      </header>
      <section className="demo-dashboard-content">
        <div className="auth-eyebrow">YOUR ADROVIS ACCOUNT</div>
        <h1>Welcome, <span>{user.name || title}</span></h1>
        <p>This is a temporary {role} dashboard preview. You are signed in through the Adrovis API.</p>
        <div className="demo-dashboard-card">
          <small>ACCOUNT TYPE</small><strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>
          <small>EMAIL</small><strong>{user.email}</strong>
          <small>PROFILE STATUS</small><strong className="demo-complete">Onboarding completed</strong>
        </div>
        <button className="auth-primary" onClick={() => navigate("/")}>Back to Adrovis website <span>→</span></button>
      </section>
    </main>
  );
}