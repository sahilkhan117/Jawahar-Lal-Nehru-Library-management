import React, { useState, useEffect } from 'react';
import {
  MdDashboard, MdLibraryBooks, MdHistory, MdWarning,
  MdTimeline, MdTrendingUp, MdMenuBook, MdNotificationsActive,
  MdBadge, MdSchool, MdCheckCircle, MdEventSeat, MdFiberManualRecord
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
  const [notices, setNotices] = useState([]);
  const [seatStats, setSeatStats] = useState({
    total: 0,
    occupied: 0,
    status: 'Loading...',
    libraries: []
  });
  const [loading, setLoading] = useState(true);

  // Generate heatmap data grouped by months (Simplified GitHub style)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const displayedMonths = [months[(currentMonth - 1 + 12) % 12], months[currentMonth]]; // Last 2 months

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, libraryRes] = await Promise.all([
          API.get('/telemetry/student'),
          API.get('/telemetry/library')
        ]);

        if (studentRes?.data?.success) {
          setStats(studentRes.data.stats);
          setNotices(studentRes.data.notices || []);
        }

        if (libraryRes?.data?.success) {
          const summary = libraryRes.data.summary || {};
          const { totalCapacity = 0, totalOccupied = 0, occupancyPercentage = 0 } = summary;

          setSeatStats({
            total: totalCapacity,
            occupied: totalOccupied,
            status: occupancyPercentage < 50 ? 'Available' : occupancyPercentage < 80 ? 'Moderate' : 'Full',
            libraries: libraryRes.data.libraries || []
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
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
    <div className="space-y-card-gap pb-10">
      <div className="max-w-6xl mx-auto space-y-card-gap">

        {/* Header Section */}
        <div className="mb-2">
          <h2 className="font-headline text-3xl italic text-on-surface">Welcome back, {user?.name?.split(' ')[0]}!</h2>
        </div>

        {/* Profile Identity Card */}
        <div className="bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 flex flex-col md:flex-row items-center md:items-start gap-8 mb-4">
          <ProfilePictureUpload />
          <div className="flex-1 text-center md:text-left space-y-4">
            <h3 className="font-headline text-4xl italic text-on-surface">{user?.name}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold border border-primary/10">
                <MdBadge className="text-lg" />
                {user?.id || 'ID N/A'}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 text-secondary text-xs font-bold border border-secondary/10">
                <MdSchool className="text-lg" />
                {user?.department || 'Student'}
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end justify-center px-8 border-l border-outline-variant/30">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 opacity-60">Status</span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-white text-xs font-bold shadow-lg shadow-secondary/20">
              <MdCheckCircle className="text-lg" />
              Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-card-gap mb-4 gap-3">
          {/* Heatmap Section */}
          <div className="col-span-12 lg:col-span-8 bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-2xl italic text-on-surface">Library Attendance</h3>
              <div className="flex gap-1">
                {displayedMonths.map(m => (
                  <span key={m} className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-40 px-2">{m}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={`col-${i}`} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }, (_, j) => {
                    // Limit to 63 total cells to cover 60 days
                    if (i === 8 && j > 3) return null;
                    const intensity = Math.floor(Math.random() * 5);
                    return (
                      <div
                        key={`cell-${i}-${j}`}
                        className={`w-4 h-4 rounded-[2px] ${intensity === 0 ? 'bg-background border border-outline-variant/10' :
                            intensity === 1 ? 'bg-primary/20' :
                              intensity === 2 ? 'bg-primary/40' :
                                intensity === 3 ? 'bg-primary/70' :
                                  'bg-primary'
                          }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-on-surface-variant opacity-40">
              <span>Last 60 Days Activity</span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                <div className="w-2 h-2 rounded-[1px] bg-background border border-outline-variant/10"></div>
                <div className="w-2 h-2 rounded-[1px] bg-primary/20"></div>
                <div className="w-2 h-2 rounded-[1px] bg-primary/40"></div>
                <div className="w-2 h-2 rounded-[1px] bg-primary/70"></div>
                <div className="w-2 h-2 rounded-[1px] bg-primary"></div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Seat Vacancy Section */}
          <div className="col-span-12 lg:col-span-4 bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <MdEventSeat className="text-2xl text-primary/20" />
            </div>
            <div className="w-full space-y-6 mt-2">
              {seatStats.libraries.map((lib, idx) => {
                const totalSeats = lib.totalSeats || 1; // Prevent division by zero
                const occupied = totalSeats - (lib.availableSeats || 0);
                const occupiedPercent = (occupied / totalSeats) * 100;

                return (
                  <div key={lib._id || idx} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="font-headline italic text-lg text-on-surface leading-tight">{lib.name}</span>
                        <span className="text-[10px] font-bold text-primary opacity-40 uppercase tracking-widest">{lib.location}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline italic text-2xl text-primary">{lib.availableSeats || 0}</span>
                        <span className="text-[10px] font-bold text-on-surface-variant opacity-20 uppercase ml-1">Vacant</span>
                      </div>
                    </div>

                    {/* Horizontal Progress Bar */}
                    <div className="h-4 w-full bg-background/50 rounded-full border border-outline-variant/10 overflow-hidden relative">
                      <div
                        className={`h-full transition-all duration-1000 ease-out ${occupiedPercent > 80 ? 'bg-red-500' :
                            occupiedPercent > 50 ? 'bg-warning' :
                              'bg-primary'
                          }`}
                        style={{ width: `${Math.min(100, Math.max(0, occupiedPercent))}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notice Box Section */}
        <div className="bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 mb-4 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <MdNotificationsActive className="text-6xl text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 rounded-lg bg-primary/10 text-primary">
               <MdNotificationsActive className="text-xl" />
             </div>
             <h3 className="font-headline text-2xl italic text-on-surface">Library Notices</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices.length > 0 ? notices.map(notice => (
              <div key={notice._id} className="p-4 rounded-xl bg-background/50 border border-outline-variant/10 hover:border-primary/30 transition-all group/item">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    notice.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                    notice.priority === 'Medium' ? 'bg-warning/10 text-warning' :
                    'bg-secondary/10 text-secondary'
                  }`}>
                    {notice.priority}
                  </span>
                  <span className="text-[9px] font-medium text-on-surface-variant opacity-40">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-on-surface mb-1 line-clamp-1 group-hover/item:text-primary transition-colors">{notice.title}</h4>
                <p className="text-xs text-on-surface-variant opacity-60 line-clamp-2 leading-relaxed">{notice.content}</p>
              </div>
            )) : (
              <div className="col-span-full py-10 flex flex-col items-center justify-center text-center opacity-40 italic">
                <MdNotificationsActive className="text-3xl mb-2" />
                <p className="text-sm">No active notices at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap mb-4 gap-3">
          <div className="bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
            <MdMenuBook className="text-4xl text-primary mb-6" />
            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 mb-1">Books Issued</h4>
            <p className="text-4xl font-headline italic text-on-surface">{stats?.issuedBooks || 0}</p>
          </div>

          <div className="bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all duration-700"></div>
            <MdNotificationsActive className={`text-4xl mb-6 ${stats?.overdueBooks > 0 ? 'text-red-500 animate-bounce' : 'text-on-surface-variant opacity-20'}`} />
            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 mb-1">Overdue Alerts</h4>
            <p className="text-4xl font-headline italic text-on-surface">{stats?.overdueBooks || 0}</p>
          </div>

          <div className="bg-surface rounded-card p-8 shadow-bento border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-tertiary/5 rounded-full blur-3xl group-hover:bg-tertiary/10 transition-all duration-700"></div>
            <MdTrendingUp className="text-4xl text-tertiary mb-6" />
            <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 mb-1">Pending Fines</h4>
            <p className="text-4xl font-headline italic text-on-surface">₹{(stats?.totalFines || 0).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}