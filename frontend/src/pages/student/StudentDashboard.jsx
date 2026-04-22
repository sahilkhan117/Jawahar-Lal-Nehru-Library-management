import React, { useState, useEffect } from 'react';
import { 
  MdBadge, MdSchool, MdCalendarToday, MdCheckCircle, 
  MdVerified, MdHistory, MdPayments, MdWorkspacePremium, 
  MdSecurity, MdDownload, MdErrorOutline 
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import ProfilePictureUpload from '../../components/profile/ProfilePictureUpload';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    issuedBooks: 0,
    overdueBooks: 0,
    totalFines: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/telemetry/student');
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch student stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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
      <div className="max-w-6xl mx-auto space-y-card-gap">
        <div className="mb-8">
          <h2 className="font-headline text-3xl italic text-on-surface">Profile & Clearances</h2>
          <p className="text-sm text-on-surface-variant mt-1 opacity-60">Manage your account details and academic clearance status.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap">
          {/* Profile Card */}
          <div className="lg:col-span-12 bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 flex flex-col md:flex-row items-center md:items-start gap-8">
            <ProfilePictureUpload />
            <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="font-headline text-4xl italic text-on-surface">{user?.name}</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold border border-primary/10">
                  <MdBadge className="text-lg" />
                  {user?.id}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 text-secondary text-xs font-bold border border-secondary/10">
                  <MdSchool className="text-lg" />
                  {user?.department || 'Student'}
                </span>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end justify-center px-8 border-l border-outline-variant/30">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 opacity-60">Account Status</span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-white text-xs font-bold shadow-lg shadow-secondary/20">
                <MdCheckCircle className="text-lg" />
                Active
              </span>
            </div>
          </div>

          {/* Clearance Card */}
          <div className="lg:col-span-8 bg-surface rounded-card p-10 shadow-bento border border-outline-variant/30 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
            
            {stats.overdueBooks > 0 || stats.totalFines > 0 ? (
              <>
                <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mb-6 ring-8 ring-red-50">
                  <MdErrorOutline className="text-5xl text-red-600" />
                </div>
                <h4 className="font-headline text-4xl italic text-on-surface mb-2">Action Required</h4>
                <p className="text-lg text-on-surface-variant max-w-md mx-auto mb-8 opacity-70">
                  You have outstanding dues or overdue materials. Please settle them to maintain your clearance.
                </p>
              </>
            ) : (
              <>
                <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mb-6 ring-8 ring-secondary/5">
                  <MdVerified className="text-5xl text-secondary" />
                </div>
                <h4 className="font-headline text-4xl italic text-on-surface mb-2">Clearance Granted</h4>
                <p className="text-lg text-on-surface-variant max-w-md mx-auto mb-8 opacity-70">
                  All library accounts are settled. You have no outstanding fines or unreturned materials.
                </p>
              </>
            )}

            <div className="w-full bg-background rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-outline-variant/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface rounded-xl border border-outline-variant/30">
                   <MdHistory className="text-2xl text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Active Issues</p>
                  <p className="text-xl font-headline italic text-on-surface">{stats.issuedBooks} Books</p>
                </div>
              </div>
              <div className="h-10 w-px bg-outline-variant/30 hidden sm:block"></div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface rounded-xl border border-outline-variant/30">
                   <MdPayments className="text-2xl text-tertiary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Current Balance</p>
                  <p className="text-xl font-headline italic text-on-surface">₹{stats.totalFines.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Badge Card */}
          <div className="lg:col-span-4 bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-headline text-2xl italic text-on-surface">Digital Badge</h4>
              <MdWorkspacePremium className="text-3xl text-tertiary" />
            </div>

            <div className="flex-1 bg-background rounded-2xl border border-outline-variant/30 p-8 flex flex-col items-center justify-center relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5"></div>
              <div className="relative z-10 text-center">
                <MdSecurity className="text-7xl text-primary mb-4 drop-shadow-xl" />
                <h5 className="font-headline text-2xl italic text-on-surface">No-Dues Verified</h5>
                <p className="text-[10px] font-bold text-on-surface-variant mt-2 opacity-60">Library Systems Dept.</p>
                <div className="mt-6 inline-block bg-surface px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold text-on-surface border border-outline-variant/30 shadow-sm">
                  ID: ND-{new Date().getFullYear()}-{user?.id?.split('-')[1] || 'AUTH'}
                </div>
              </div>
            </div>

            <button className="btn-primary w-full py-4 flex items-center justify-center gap-3">
              <MdDownload className="text-2xl" />
              Generate Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
