import React, { useState, useEffect } from 'react';
import { 
  MdBadge, MdBook, MdCheckCircle, MdArrowForward, 
  MdSwapHoriz, MdKeyboardReturn, MdErrorOutline,
  MdHistory, MdPerson, MdTimer, MdQrCodeScanner
} from 'react-icons/md';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function LibrarianPOS() {
  const [mode, setMode] = useState('issue'); // 'issue' or 'return'
  const [formData, setFormData] = useState({ studentId: '', isbn: '' });
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  // Fetch recent activity on mount
  useEffect(() => {
    // In a real app, we'd have a global telemetry/activity endpoint
    // For now, we'll just track session activity
  }, []);

  const handleProcess = async (e) => {
    e.preventDefault();
    if (mode === 'issue' && (!formData.studentId || !formData.isbn)) {
        toast.error('Please enter both Student ID and ISBN');
        return;
    }
    if (mode === 'return' && !formData.isbn) {
        toast.error('Please enter ISBN');
        return;
    }

    setLoading(true);
    try {
      const endpoint = mode === 'issue' ? '/transactions/issue' : '/transactions/return';
      const res = await API.post(endpoint, formData);
      
      if (res.data.success) {
        toast.success(res.data.message);
        setLastAction({
          type: mode,
          data: res.data.transaction,
          timestamp: new Date()
        });
        setRecentActivity([
          { 
            id: Date.now(),
            type: mode, 
            student: res.data.transaction.studentId?.name || 'Patron', 
            book: res.data.transaction.bookId?.title || formData.isbn,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'success'
          },
          ...recentActivity.slice(0, 4)
        ]);
        setFormData({ studentId: '', isbn: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="font-headline text-3xl italic text-on-surface">Circulation Desk</h2>
          <p className="text-on-surface-variant/60 text-sm mt-1">Real-time book issuance and return management.</p>
        </div>
        <div className="flex bg-surface-variant/20 p-1.5 rounded-2xl border border-outline-variant/10 w-fit">
          <button 
            onClick={() => setMode('issue')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              mode === 'issue' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <MdArrowForward className="text-lg" />
            Issue Book
          </button>
          <button 
            onClick={() => setMode('return')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              mode === 'return' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <MdKeyboardReturn className="text-lg" />
            Return Book
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Processing Area */}
        <div className="col-span-12 lg:col-span-8 bg-surface rounded-card p-10 shadow-bento border border-outline-variant/30 relative overflow-hidden flex flex-col min-h-[450px]">
          <div className={`absolute top-0 right-0 w-64 h-64 ${mode === 'issue' ? 'bg-primary/5' : 'bg-secondary/5'} rounded-full blur-3xl -mr-20 -mt-20`}></div>
          
          <form onSubmit={handleProcess} className="relative z-10 flex flex-col h-full">
            <div className="space-y-8 flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div className={`p-3 rounded-2xl ${mode === 'issue' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                  {mode === 'issue' ? <MdSwapHoriz className="text-3xl" /> : <MdKeyboardReturn className="text-3xl" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface capitalize">{mode} Transaction</h3>
                  <p className="text-xs text-on-surface-variant opacity-60">Scan barcode or enter identification manually.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mode === 'issue' && (
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 opacity-60">Patron ID</label>
                    <div className="relative flex items-center">
                      <MdBadge className={`absolute left-4 text-xl transition-colors ${formData.studentId ? 'text-primary' : 'text-on-surface-variant/40'}`} />
                      <input 
                        value={formData.studentId}
                        onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                        className="w-full bg-background/50 border border-outline-variant/20 rounded-2xl pl-12 pr-4 py-4 font-body text-on-surface focus:outline-none focus:border-primary/50 focus:bg-background transition-all" 
                        placeholder="Student ID (e.g. S101)" 
                        type="text"
                      />
                    </div>
                  </div>
                )}
                <div className={`space-y-2 group ${mode === 'return' ? 'md:col-span-2' : ''}`}>
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 opacity-60">Book ISBN / ID</label>
                  <div className="relative flex items-center">
                    <MdBook className={`absolute left-4 text-xl transition-colors ${formData.isbn ? (mode === 'issue' ? 'text-primary' : 'text-secondary') : 'text-on-surface-variant/40'}`} />
                    <input 
                      value={formData.isbn}
                      onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                      className="w-full bg-background/50 border border-outline-variant/20 rounded-2xl pl-12 pr-4 py-4 font-body text-on-surface focus:outline-none focus:border-current transition-all" 
                      style={{ borderColor: formData.isbn ? (mode === 'issue' ? 'var(--primary)' : 'var(--secondary)') : '' }}
                      placeholder="Enter ISBN or scan barcode" 
                      type="text"
                    />
                    <button type="button" className="absolute right-4 p-2 text-on-surface-variant/40 hover:text-primary transition-colors">
                      <MdQrCodeScanner className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/20">
              <div className="flex items-center gap-2 text-on-surface-variant/40 italic text-xs">
                <MdTimer />
                Auto-resets in 30s
              </div>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({ studentId: '', isbn: '' })}
                  className="px-8 py-3.5 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-variant/20 transition-all"
                >
                  Clear Fields
                </button>
                <button 
                  disabled={loading}
                  className={`px-12 py-3.5 rounded-xl font-headline italic text-lg shadow-xl transition-all flex items-center gap-3 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    mode === 'issue' 
                    ? 'bg-primary text-white shadow-primary/30 hover:shadow-primary/40' 
                    : 'bg-secondary text-white shadow-secondary/30 hover:shadow-secondary/40'
                  }`}
                >
                  {loading ? 'Processing...' : `Confirm ${mode}`}
                  <MdCheckCircle className="text-xl" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Info & Status Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Status Card */}
          <div className={`rounded-card p-8 shadow-bento border relative overflow-hidden transition-all duration-500 ${
            lastAction 
            ? 'bg-surface border-outline-variant/30 scale-100 opacity-100' 
            : 'bg-surface/30 border-dashed border-outline-variant/50 scale-95 opacity-50'
          }`}>
            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6 opacity-60">Last Successful Action</h4>
            {lastAction ? (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl ${lastAction.type === 'issue' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    <MdCheckCircle className="text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-on-surface truncate">{lastAction.data?.bookId?.title || 'Unknown Title'}</p>
                    <p className="text-xs text-on-surface-variant opacity-60 flex items-center gap-1 mt-1">
                      <MdPerson /> {lastAction.data?.studentId?.name || 'Patron'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-outline-variant/10">
                  <div className="bg-background/50 p-3 rounded-xl">
                    <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter opacity-40">Status</p>
                    <p className={`text-xs font-bold ${lastAction.type === 'issue' ? 'text-primary' : 'text-secondary'}`}>
                      {lastAction.type === 'issue' ? 'Issued' : 'Returned'}
                    </p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-xl">
                    <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter opacity-40">Due Date</p>
                    <p className="text-xs font-bold text-on-surface">
                      {lastAction.data?.dueDate ? new Date(lastAction.data.dueDate).toLocaleDateString() : '--'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center italic text-sm text-on-surface-variant/40">
                Ready for next scan...
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30">
            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6 opacity-60">Session Metrics</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-all">
                <div className="flex items-center gap-3">
                  <MdArrowForward className="text-xl text-primary" />
                  <span className="text-sm font-bold text-on-surface">Issued Today</span>
                </div>
                <span className="font-headline italic text-2xl text-primary">0</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/5 border border-secondary/10 group hover:bg-secondary/10 transition-all">
                <div className="flex items-center gap-3">
                  <MdKeyboardReturn className="text-xl text-secondary" />
                  <span className="text-sm font-bold text-on-surface">Returned Today</span>
                </div>
                <span className="font-headline italic text-2xl text-secondary">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        <div className="col-span-12 bg-surface rounded-card shadow-bento border border-outline-variant/30 overflow-hidden">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-variant/5">
            <div className="flex items-center gap-3">
              <MdHistory className="text-xl text-on-surface-variant" />
              <h3 className="font-headline italic text-xl text-on-surface">Live Activity Feed</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background/30">
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Time</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Action</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Book</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {recentActivity.length > 0 ? recentActivity.map(act => (
                  <tr key={act.id} className="group hover:bg-surface-variant/5 transition-all">
                    <td className="px-6 py-4 text-xs font-bold text-on-surface-variant opacity-60">{act.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                        act.type === 'issue' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                      }`}>
                        {act.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-on-surface">{act.student}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant opacity-80">{act.book}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary uppercase">
                        <MdCheckCircle className="text-sm" /> {act.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm italic text-on-surface-variant/40">
                      No activity recorded in this session.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}