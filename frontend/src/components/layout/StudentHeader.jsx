import React from 'react';
import { MdSearch, MdNotifications, MdHelpOutline, MdMenu, MdLogout } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/student/catalog?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/student/catalog');
    }
  };

  return (
    <header className="bg-surface/60 backdrop-blur-xl sticky top-0 w-full z-40 border-b border-outline-variant/30 flex items-center justify-between px-8 py-3 transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors rounded-xl bg-surface-variant/10">
          <MdMenu className="text-2xl" />
        </button>
        <div className="flex flex-col">
          <span className="font-headline italic text-xl text-on-surface tracking-tight">Library Portal</span>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] opacity-40 leading-none">Student Station</span>
        </div>
      </div>

      {/* Center - Search (Hidden on small mobile) */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-12">
        <form onSubmit={handleSearch} className="relative w-full group">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40 text-xl group-focus-within:text-primary group-focus-within:opacity-100 transition-all" />
          <input 
            className="w-full bg-background/50 border border-outline-variant/20 rounded-full pl-12 pr-4 py-2.5 font-body text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 focus:bg-background transition-all" 
            placeholder="Search resources, books, or domains..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/20 bg-surface text-[10px] font-mono text-on-surface-variant opacity-40">Ctrl</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/20 bg-surface text-[10px] font-mono text-on-surface-variant opacity-40">K</kbd>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 mr-2 px-1">
          <button className="p-2.5 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-primary/5 relative">
            <MdNotifications className="text-xl" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
          </button>
          <button className="p-2.5 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-primary/5 hidden sm:block">
            <MdHelpOutline className="text-xl" />
          </button>
        </div>

        <div className="h-8 w-px bg-outline-variant/20 mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold text-on-surface leading-none">{user?.name || 'Student'}</span>
            <span className="text-[10px] text-primary font-bold opacity-40 uppercase tracking-tighter">{user?.department || 'Member'}</span>
          </div>
          <div className="relative">
            <div className="h-10 w-10 rounded-xl overflow-hidden border border-outline-variant/30 group-hover:border-primary/50 transition-colors bg-surface-variant/20">
              {user?.profilePicture ? (
                <img alt={user.name} className="w-full h-full object-cover" src={user.profilePicture}/>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary font-bold">
                  {user?.name?.[0] || 'S'}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary border-2 border-surface flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
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

export default StudentHeader;
