import React from 'react';
import { MdSearch, MdNotifications, MdHelpOutline, MdMenu, MdLogout, MdSecurity } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-surface/60 backdrop-blur-xl sticky top-0 w-full z-40 border-b border-outline-variant/30 flex items-center justify-between px-8 py-3 transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors rounded-xl bg-surface-variant/10">
          <MdMenu className="text-2xl" />
        </button>
        <div className="flex flex-col">
          <span className="font-headline italic text-xl text-on-surface tracking-tight">Admin Console</span>
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] opacity-40 leading-none">System Oversight</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-12">
        <div className="relative w-full group">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40 text-xl group-focus-within:text-red-500 group-focus-within:opacity-100 transition-all" />
          <input 
            className="w-full bg-background/50 border border-outline-variant/20 rounded-full pl-12 pr-4 py-2.5 font-body text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-red-500/50 focus:bg-background transition-all" 
            placeholder="Search telemetry, users, or logs..." 
            type="text"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 mr-2 px-1">
          <button className="p-2.5 text-on-surface-variant hover:text-red-500 transition-all rounded-full hover:bg-red-500/5 relative">
            <MdNotifications className="text-xl" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
          </button>
          <button className="p-2.5 text-on-surface-variant hover:text-red-500 transition-all rounded-full hover:bg-red-500/5 hidden sm:block">
            <MdHelpOutline className="text-xl" />
          </button>
        </div>

        <div className="h-8 w-px bg-outline-variant/20 mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold text-on-surface leading-none">{user?.name || 'Administrator'}</span>
            <span className="text-[10px] text-red-500 font-bold opacity-40 uppercase tracking-tighter">Root Access</span>
          </div>
          <div className="relative">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center border border-outline-variant/30 group-hover:border-red-500/50 transition-colors bg-red-500/5 text-red-500 font-bold">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-surface flex items-center justify-center">
              <MdSecurity className="text-[10px] text-white" />
            </div>
          </div>
        </div>

        <button 
          onClick={logout}
          className="ml-4 p-2.5 text-on-surface-variant hover:text-red-500 transition-all rounded-xl hover:bg-red-500/5 group"
          title="Logout"
        >
          <MdLogout className="text-xl group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
