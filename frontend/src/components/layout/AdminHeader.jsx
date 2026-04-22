import React from 'react';
import { MdSearch, MdNotifications, MdHelpOutline, MdDarkMode } from 'react-icons/md';

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between w-full h-16 px-8 bg-white/80 backdrop-blur-md border-b border-slate-100 font-manrope text-sm hidden md:flex">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-md">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg" />
          <input className="w-full pl-10 pr-4 py-2 bg-[#F1F5F9] border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-full text-sm transition-all outline-none" placeholder="Search telemetry..." type="text"/>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-lg font-black tracking-tight text-slate-900">LMS Premium</span>
      </div>
      <div className="flex items-center justify-end gap-6 w-1/3">
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:opacity-80 transition-opacity active:scale-95 transition-transform">
            <MdNotifications className="text-xl" />
          </button>
          <button className="hover:opacity-80 transition-opacity active:scale-95 transition-transform">
            <MdHelpOutline className="text-xl" />
          </button>
          <button className="hover:opacity-80 transition-opacity active:scale-95 transition-transform">
            <MdDarkMode className="text-xl" />
          </button>
        </div>
        <div className="h-8 w-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant/30 flex-shrink-0 cursor-pointer">
          <img alt="Administrator Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQCcfV7ZH3IH5QpcMcxo4YYucn41nMxI34Ht96076f0yHDpZyBL1H2XRMk-fZwXTuAJYmD-VIr-pihUKFn8tGLlRS50Dg9Fi5UsWK8bXwb6Cjom130iwViwWUbYGUgiVESJw4sVx1pvVCrylKPk4jyEMODx5McNkAnaaYkhIKt9yGUSThIOCmbIBMQ-96JnJ_M-_R-fl7Ey_DIj-mW2F7abnLgAx5IJOjQltTdTfQYShNRtHESTtqmBTq9A_Rdw1NRuOPD3nobMocd"/>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
