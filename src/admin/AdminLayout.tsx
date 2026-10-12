import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";
import { Logo } from "../components/common/Logo";
import {
  LayoutDashboard,
  Briefcase,
  Handshake,
  Camera,
  FileText,
  Image,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck
} from "lucide-react";

export const AdminLayout: React.FC = () => {
  const { user, adminData, loading, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If loading, render secure barrier so no content ever flashes before authorization check
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070D1F] flex flex-col items-center justify-center text-white p-4">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
          Verifying Administrator Privileges...
        </span>
        <span className="text-[11px] text-slate-400 mt-1">
          Validating Firebase Authentication &amp; Firestore Allowlist
        </span>
      </div>
    );
  }

  // If not logged in or unauthorized, redirect immediately to login
  if (!user || !adminData) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { label: "Overview", path: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Services Management", path: "/admin/services", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Industry Partners", path: "/admin/partners", icon: <Handshake className="w-4 h-4" /> },
    { label: "Institutional Gallery", path: "/admin/gallery", icon: <Camera className="w-4 h-4" /> },
    { label: "Website Content", path: "/admin/content", icon: <FileText className="w-4 h-4" /> },
    { label: "Image & Media", path: "/admin/media", icon: <Image className="w-4 h-4" /> },
    { label: "Enquiries & Leads", path: "/admin/enquiries", icon: <Inbox className="w-4 h-4" /> }
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#0B132B] text-white p-4 flex items-center justify-between border-b border-slate-800">
        <Logo variant="compact" theme="light" size="sm" />
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-white cursor-pointer"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0B132B] text-slate-300 flex flex-col justify-between p-6 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Logo / Title */}
          <div>
            <Logo variant="full" theme="light" size="sm" />
            <div className="mt-3 px-2 py-1.5 rounded bg-slate-800/80 border border-[#D4AF37]/30 text-[11px] font-semibold text-[#E5C158] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Authorized Admin</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                Active
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B132B] font-bold shadow-md shadow-[#D4AF37]/20"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">LIVE</span>
          </Link>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-200 truncate">
              {user?.email || adminData?.email}
            </div>
            <div className="text-[10px] text-slate-400">UID: {user?.uid.slice(0, 8)}...</div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
