import React, { useState, useEffect } from 'react';
import { 
  MdDownload, MdBook, MdHistoryToggleOff, 
  MdHeadphones, MdTabletMac, MdHourglassEmpty 
} from 'react-icons/md';
import API from '../../api/axios';

export default function StudentHistory() {
  const [activeLoans, setActiveLoans] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get('/transactions/student');
        if (data.success) {
          setActiveLoans(data.active);
          setHistory(data.history);
        }
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">Retrieving Records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-card-gap pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-headline text-3xl italic text-on-surface mb-2">Reading & Activity History</h2>
          <p className="text-sm text-on-surface-variant opacity-60">Track your current loans and past reading habits.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary/10 text-primary font-bold text-xs px-6 py-3 rounded-full hover:bg-primary/20 transition-all">
          <MdDownload className="text-lg" />
          Export Log
        </button>
      </div>

      <div className="space-y-6">
        {/* Active Loans */}
        <div className="bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <MdBook className="text-xl" />
            </div>
            <h3 className="font-headline text-2xl italic text-on-surface">Currently Checked Out</h3>
          </div>
          
          {activeLoans.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/10">
                    <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Book Details</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Checked Out</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Due Date</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-on-surface">
                  {activeLoans.map(loan => (
                    <tr key={loan._id} className="border-b border-outline-variant/5 hover:bg-primary/5 transition-colors group">
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-14 bg-background rounded overflow-hidden flex-shrink-0">
                            {loan.bookId?.coverImage ? (
                              <img src={loan.bookId.coverImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center opacity-10">
                                <MdBook />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{loan.bookId?.title || 'Unknown Title'}</p>
                            <p className="text-[10px] text-on-surface-variant opacity-40 uppercase tracking-widest">By {loan.bookId?.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-on-surface-variant opacity-60">
                        {new Date(loan.issueDate).toLocaleDateString()}
                      </td>
                      <td className="py-5 px-4 font-bold">
                        <span className={new Date(loan.dueDate) < new Date() ? 'text-red-500' : 'text-on-surface'}>
                          {new Date(loan.dueDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-5 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          loan.status === 'overdue' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                          'bg-secondary/10 text-secondary border border-secondary/20'
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 flex flex-col items-center justify-center text-center opacity-40 italic">
              <MdHourglassEmpty className="text-3xl mb-2" />
              <p className="text-sm">No books currently issued.</p>
            </div>
          )}
        </div>

        {/* History Log */}
        <div className="bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-on-surface/5 text-on-surface">
              <MdHistoryToggleOff className="text-xl" />
            </div>
            <h3 className="font-headline text-2xl italic text-on-surface">Reading History Log</h3>
          </div>
          
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/10">
                    <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Book Title</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Author</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Returned Date</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">Format</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-on-surface">
                  {history.map(item => (
                    <tr key={item._id} className="border-b border-outline-variant/5 hover:bg-on-surface/5 transition-colors">
                      <td className="py-4 px-4 font-bold">{item.bookId?.title || 'Unknown Title'}</td>
                      <td className="py-4 px-4 text-on-surface-variant opacity-60">{item.bookId?.author}</td>
                      <td className="py-4 px-4 text-on-surface-variant opacity-60">
                        {item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest opacity-60">
                          <MdBook className="text-[14px]" /> Physical
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 flex flex-col items-center justify-center text-center opacity-40 italic">
              <p className="text-sm">Your reading history will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
