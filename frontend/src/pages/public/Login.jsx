import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MdSchool, MdBadge, MdLock, MdVisibility, MdVisibilityOff, 
  MdArrowForward, MdShield, MdSpeed, MdPublic, MdHelpOutline
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const StatChip = ({ num, label }) => (
  <div className="text-center px-4">
    <div className="text-2xl font-headline italic text-on-surface">{num}</div>
    <div className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">{label}</div>
  </div>
);

const FeaturePill = ({ icon: Icon, title, desc, colorClass }) => (
  <div className={`p-5 rounded-2xl border border-outline-variant/30 flex gap-4 items-start ${colorClass}`}>
    <div className="p-2 rounded-lg bg-surface/50 shadow-sm">
      <Icon className="text-2xl" />
    </div>
    <div>
      <h4 className="text-sm font-bold tracking-tight mb-1">{title}</h4>
      <p className="text-[11px] leading-relaxed opacity-70">{desc}</p>
    </div>
  </div>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const result = await login(enrollmentId, password);
    
    if (result.success) {
      // Redirect based on role
      if (result.role === 'admin') navigate('/admin');
      else if (result.role === 'librarian') navigate('/librarian');
      else navigate('/student');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-on-background flex flex-col">
      {/* Top Bar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-surface border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
            <MdSchool className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-headline italic tracking-tight text-on-surface leading-none">Jawaharlal Nehru Library</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Dr. Harisingh Gour University</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-on-surface-variant opacity-40 uppercase tracking-widest">Est. 1946</span>
          <div className="h-4 w-px bg-outline-variant/30"></div>
          <a href="#" className="flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">
            <MdHelpOutline className="text-lg" />
            Support
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Information */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface border border-outline-variant/30 rounded-card p-10 flex-1 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
              
              <div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full border border-secondary/20 mb-8"
                >
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Active Academic Session</span>
                </motion.div>
                
                <h1 className="font-headline text-5xl md:text-6xl italic text-on-surface leading-none mb-6">
                  The Gateway to <br />
                  <span className="text-primary underline decoration-primary/20">Digital</span> Wisdom.
                </h1>
                
                <p className="text-lg text-on-surface-variant max-w-md leading-relaxed mb-10">
                  Secure access to 400,000+ volumes, 12,000+ e-journals, and the global scholarly network of Dr. Harisingh Gour Central University.
                </p>
              </div>

              <div className="flex divide-x divide-outline-variant/30 pt-8 border-t border-outline-variant/20">
                <StatChip num="400k+" label="Volumes" />
                <StatChip num="12k+" label="Journals" />
                <StatChip num="24/7" label="Access" />
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <FeaturePill 
                  icon={MdSpeed} 
                  title="Fast Access" 
                  desc="Single sign-on for all university resources." 
                  colorClass="bg-secondary/5 text-secondary border-secondary/20"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <FeaturePill 
                  icon={MdShield} 
                  title="Secure Portal" 
                  desc="Encrypted institutional gateway protocols." 
                  colorClass="bg-primary/5 text-primary border-primary/20"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-surface border border-outline-variant/30 rounded-card p-10 shadow-bento"
          >
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl italic text-on-surface mb-2">Member Login</h2>
              <p className="text-sm text-on-surface-variant opacity-60">Please enter your institutional credentials.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 ml-1">Enrollment Number</label>
                <div className="relative group">
                  <MdBadge className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-on-surface-variant group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="e.g. UN-123456" 
                    value={enrollmentId}
                    onChange={(e) => setEnrollmentId(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-background border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end mb-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 ml-1">Password</label>
                  <a href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot?</a>
                </div>
                <div className="relative group">
                  <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-on-surface-variant group-focus-within:text-primary transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-background border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs font-medium text-on-surface-variant cursor-pointer select-none">Remember device for 30 days</label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In to Portal
                    <MdArrowForward className="text-xl" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-outline-variant/20">
              <button className="w-full py-4 px-6 border border-outline-variant/30 rounded-xl flex items-center justify-center gap-3 hover:bg-background transition-all group">
                <div className="flex gap-0.5">
                   <div className="w-2 h-2 rounded-full bg-primary"></div>
                   <div className="w-2 h-2 rounded-full bg-secondary"></div>
                   <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                </div>
                <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface">Institutional SSO</span>
              </button>
              
              <p className="text-center mt-8 text-[11px] text-on-surface-variant opacity-60">
                Trouble logging in? <a href="#" className="font-bold text-primary hover:underline">Contact Administrator</a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-10 py-8 bg-surface border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[10px] font-mono text-on-surface-variant opacity-40 uppercase tracking-widest">
          © 2026 Nexus Institutional Framework
        </span>
        <div className="flex gap-8">
          {["Privacy", "Terms", "Support"].map(link => (
            <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}