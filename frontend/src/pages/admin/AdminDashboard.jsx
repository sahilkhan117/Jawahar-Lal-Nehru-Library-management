import React, { useState, useEffect } from 'react';
import { 
  MdSync, MdGroups, MdTrendingUp, MdAccountBalanceWallet, 
  MdTrendingDown, MdLibraryBooks, MdDns, MdNotificationsNone 
} from 'react-icons/md';
import API from '../../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalStudents: 0,
    activeTransactions: 0,
    overdueTransactions: 0
  });
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/telemetry/global');
      if (data.success) {
        setStats(data.stats);
        setNotices(data.notices);
      }
    } catch (error) {
      console.error("Failed to fetch admin telemetry", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-card-gap">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl italic text-on-surface mb-2 tracking-tight">Telemetry Overview</h1>
          <p className="text-sm text-on-surface-variant opacity-60">Real-time institutional metrics and physical asset tracking.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary px-6 py-3 text-xs">Export Report</button>
          <button 
            onClick={fetchData}
            className="btn-primary px-6 py-3 text-xs flex items-center gap-2"
          >
            <MdSync className={`text-lg ${loading ? 'animate-spin' : ''}`} />
            Live Sync
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards */}
        <StatCard 
          label="Total Students" 
          value={stats.totalStudents} 
          icon={MdGroups} 
          trend="+12%" 
          color="primary"
        />
        <StatCard 
          label="Active Circulation" 
          value={stats.activeTransactions} 
          icon={MdLibraryBooks} 
          trend="Live" 
          color="secondary"
        />
        <StatCard 
          label="Overdue Alerts" 
          value={stats.overdueTransactions} 
          icon={MdTrendingDown} 
          trend="Critical" 
          color="tertiary"
        />
        <StatCard 
          label="Catalog Strength" 
          value={stats.totalBooks} 
          icon={MdDns} 
          trend="99.9%" 
          color="on-surface"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-8 bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 min-h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-2xl italic text-on-surface">Footfall Volume Trends</h2>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Hourly activity data</p>
            </div>
          </div>
          <div className="flex-1 relative w-full h-full">
            <ChartPlaceholder />
          </div>
        </div>

        {/* Recent Notices Section */}
        <div className="lg:col-span-4 bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-2xl italic text-on-surface">Live Notices</h2>
            <MdNotificationsNone className="text-2xl text-primary" />
          </div>
          
          <div className="space-y-4 flex-1">
            {notices.length > 0 ? notices.map((notice, i) => (
              <div key={i} className="p-4 bg-background rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                    notice.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-secondary/10 text-secondary'
                  }`}>
                    {notice.priority}
                  </span>
                  <span className="text-[9px] text-on-surface-variant opacity-40 font-mono">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-1">{notice.title}</h4>
                <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed opacity-70">
                  {notice.content}
                </p>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full opacity-30">
                <MdNotificationsNone className="text-6xl mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">No active notices</p>
              </div>
            )}
          </div>
          
          <button className="btn-secondary w-full py-3 mt-8 text-xs">Manage All Notices</button>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, icon: Icon, trend, color }) => (
  <div className="bg-surface rounded-card p-6 shadow-bento border border-outline-variant/30 flex flex-col justify-between h-[160px] group hover:border-primary/30 transition-all">
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">{label}</span>
      <div className={`p-2 rounded-lg bg-${color}/10 text-${color} group-hover:scale-110 transition-transform`}>
        <Icon className="text-xl" />
      </div>
    </div>
    <div>
      <div className="flex items-baseline gap-2">
        <span className="font-headline text-4xl italic text-on-surface">{value.toLocaleString()}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{trend}</span>
      </div>
    </div>
  </div>
);

const ChartPlaceholder = () => (
  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 250">
    <line stroke="currentColor" className="text-outline-variant/30" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="800" y1="20" y2="20"></line>
    <line stroke="currentColor" className="text-outline-variant/30" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="800" y1="80" y2="80"></line>
    <line stroke="currentColor" className="text-outline-variant/30" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="800" y1="140" y2="140"></line>
    <line stroke="currentColor" className="text-outline-variant/30" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="800" y1="200" y2="200"></line>
    
    <path d="M40,180 C150,150 250,50 344,40 C450,30 550,120 648,150 C750,180 780,140 800,100 L800,200 L40,200 Z" fill="currentColor" className="text-primary/5"></path>
    <path d="M40,180 C150,150 250,50 344,40 C450,30 550,120 648,150 C750,180 780,140 800,100" fill="none" stroke="currentColor" className="text-primary" strokeLinecap="round" strokeWidth="3"></path>
    
    <circle cx="344" cy="40" fill="white" r="5" stroke="currentColor" className="text-primary" strokeWidth="2"></circle>
  </svg>
);
