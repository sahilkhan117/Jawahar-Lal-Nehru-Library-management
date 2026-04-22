import React, { useState, useEffect } from 'react';
import { 
  MdSearch, MdNotifications, MdHelpOutline, MdFilterList, 
  MdCampaign, MdWarning, MdTrendingUp, MdHourglassBottom, 
  MdPriorityHigh, MdAccountBalanceWallet, MdCheckCircle, 
  MdKeyboardArrowDown, MdMail, MdSchedule, MdInfo, 
  MdChevronLeft, MdChevronRight, MdPersonSearch, MdHistory
} from 'react-icons/md';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function LibrarianDefaulters() {
  const [defaulters, setDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOverdue: 0,
    criticalDefaults: 0,
    totalFines: 0
  });

  useEffect(() => {
    const fetchDefaulters = async () => {
      try {
        setLoading(true);
        // Assuming we have an endpoint or we filter transactions
        const res = await API.get('/telemetry/library');
        if (res.data.success) {
            // Mocking for now as per current backend state, but prepared for real data
            const mockDefaulters = [
                { 
                    id: '1', 
                    name: 'Eleanor James', 
                    studentId: 'ST-99281', 
                    book: 'Principles of Quantum Mechanics', 
                    author: 'P.A.M. Dirac',
                    dueDate: 'Oct 12, 2023',
                    daysOverdue: 21,
                    status: 'critical',
                    initials: 'EJ'
                },
                { 
                    id: '2', 
                    name: 'Marcus Webb', 
                    studentId: 'ST-44102', 
                    book: 'Macroeconomics, 8th Ed.', 
                    author: 'Gregory Mankiw',
                    dueDate: 'Oct 19, 2023',
                    daysOverdue: 14,
                    status: 'high',
                    initials: 'MW'
                },
                { 
                    id: '3', 
                    name: 'Sarah Kline', 
                    studentId: 'ST-10994', 
                    book: 'Design of Everyday Things', 
                    author: 'Don Norman',
                    dueDate: 'Oct 28, 2023',
                    daysOverdue: 5,
                    status: 'medium',
                    initials: 'SK'
                }
            ];
            setDefaulters(mockDefaulters);
            setStats({
                totalOverdue: 142,
                criticalDefaults: 38,
                totalFines: 450.50
            });
        }
      } catch (error) {
        console.error("Failed to fetch defaulters", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaulters();
  }, []);

  const handleNudge = (studentId) => {
    toast.success(`Reminder sent to student ${studentId}`);
  };

  const handleNudgeAll = () => {
    toast.promise(
        new Promise(resolve => setTimeout(resolve, 2000)),
        {
          loading: 'Sending bulk reminders...',
          success: '142 students nudged successfully!',
          error: 'Failed to send reminders',
        }
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div className="space-y-1">
          <h2 className="font-headline text-3xl italic text-on-surface">Compliance Hub</h2>
          <p className="text-on-surface-variant/60 text-sm">Monitor asset retention and enforce return policies.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden md:block">
            <MdPersonSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
            <input 
              type="text" 
              placeholder="Search student or ID..."
              className="pl-12 pr-4 py-2.5 rounded-xl bg-surface border border-outline-variant/30 text-xs font-bold text-on-surface focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <button 
            onClick={handleNudgeAll}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-500 text-white font-headline italic text-lg shadow-xl shadow-red-500/20 hover:shadow-red-500/30 transition-all"
          >
            <MdCampaign className="text-xl" />
            Nudge All
          </button>
        </div>
      </div>

      {/* Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-card p-8 border border-outline-variant/30 shadow-bento relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
            <MdWarning className="text-6xl text-red-500" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
              <MdWarning className="text-2xl" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Overdue Assets</span>
          </div>
          <div className="font-headline italic text-4xl text-on-surface">{stats.totalOverdue}</div>
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter mt-4 flex items-center gap-1">
            <MdTrendingUp /> +12 new since last audit
          </p>
        </div>

        <div className="bg-surface rounded-card p-8 border border-outline-variant/30 shadow-bento relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
            <MdPriorityHigh className="text-6xl text-warning" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-warning/10 text-warning">
              <MdHourglassBottom className="text-2xl" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Critical Defaults</span>
          </div>
          <div className="font-headline italic text-4xl text-on-surface">{stats.criticalDefaults}</div>
          <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-tighter mt-4">
             Items overdue by &gt; 14 days
          </p>
        </div>

        <div className="bg-surface rounded-card p-8 border border-outline-variant/30 shadow-bento relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
            <MdAccountBalanceWallet className="text-6xl text-secondary" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
              <MdAccountBalanceWallet className="text-2xl" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Outstanding Fines</span>
          </div>
          <div className="font-headline italic text-4xl text-on-surface">₹{stats.totalFines.toFixed(2)}</div>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-tighter mt-4 flex items-center gap-1">
            <MdCheckCircle /> ₹120.00 recovered today
          </p>
        </div>
      </div>

      {/* Defaulters Table */}
      <div className="bg-surface rounded-card shadow-bento border border-outline-variant/30 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-variant/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
             <MdHistory className="text-xl text-on-surface-variant opacity-60" />
             <h3 className="font-headline italic text-xl text-on-surface">Priority Recovery List</h3>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/50 border border-outline-variant/20 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hover:bg-background transition-all">
             Sort by Days Overdue <MdKeyboardArrowDown className="text-sm" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background/30 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                <th className="px-6 py-4">Patron Identity</th>
                <th className="px-6 py-4">Overdue Asset</th>
                <th className="px-6 py-4">Due Since</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Escalation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {loading ? (
                <tr>
                   <td colSpan="5" className="py-20 text-center italic text-on-surface-variant/40">Syncing Defaulters...</td>
                </tr>
              ) : defaulters.map(def => (
                <tr key={def.id} className="group hover:bg-surface-variant/5 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-headline italic text-lg shadow-sm ${
                        def.status === 'critical' ? 'bg-red-500/10 text-red-500' : 
                        def.status === 'high' ? 'bg-warning/10 text-warning' : 
                        'bg-secondary/10 text-secondary'
                      }`}>
                        {def.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-on-surface truncate">{def.name}</div>
                        <div className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-tighter">{def.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="min-w-0 max-w-[200px]">
                      <div className="text-sm font-bold text-on-surface truncate">{def.book}</div>
                      <div className="text-[10px] text-on-surface-variant opacity-60 truncate">{def.author}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-on-surface-variant opacity-80">{def.dueDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      def.status === 'critical' ? 'bg-red-500/10 text-red-500' : 
                      def.status === 'high' ? 'bg-warning/10 text-warning' : 
                      'bg-secondary/10 text-secondary'
                    }`}>
                      {def.status === 'critical' ? <MdPriorityHigh /> : <MdSchedule />}
                      {def.daysOverdue} Days
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleNudge(def.studentId)}
                      className="px-4 py-2 rounded-xl border border-outline-variant/30 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <MdMail className="inline mr-1 text-sm" /> Send Notice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between bg-surface-variant/5">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">
            Audit Complete. {defaulters.length} Priority cases flagged.
          </span>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl hover:bg-surface-variant/20 transition-all disabled:opacity-20" disabled>
              <MdChevronLeft className="text-xl" />
            </button>
            <button className="w-8 h-8 rounded-xl bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20">1</button>
            <button className="p-2 rounded-xl hover:bg-surface-variant/20 transition-all disabled:opacity-20" disabled>
              <MdChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
