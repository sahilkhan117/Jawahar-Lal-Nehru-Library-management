import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  MdArrowForward, MdAutoAwesome, MdSensors, MdLibraryBooks, 
  MdHistory, MdBook, MdHub, MdPublic, MdSecurity, MdSchool,
  MdTimeline, MdAutoStories, MdExplore, MdContactSupport, MdMail, MdPhone, MdLocationOn
} from 'react-icons/md';

const LiveDot = () => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
  </span>
);

const BentoCard = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-surface border border-outline-variant/30 rounded-card p-8 shadow-bento group hover:shadow-xl transition-all ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ title, subtitle, light = false }) => (
  <div className="flex flex-col md:flex-row justify-between items-end mb-16">
    <motion.div
       initial={{ opacity: 0, x: -20 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
    >
      <h2 className={`font-headline text-4xl md:text-5xl italic ${light ? 'text-surface' : 'text-on-surface'} mb-4`}>{title}</h2>
      <div className={`h-1 w-16 ${light ? 'bg-surface/30' : 'bg-primary'} rounded-full`}></div>
    </motion.div>
    <p className={`text-label-md font-bold uppercase tracking-[0.2em] ${light ? 'text-surface/60' : 'text-on-surface-variant'}`}>{subtitle}</p>
  </div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary/20">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-outline-variant/20 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg">
            <MdSchool className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-headline italic tracking-tight text-on-surface leading-none">Jawaharlal Nehru Library</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Dr. Harisingh Gour University</span>
          </div>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#about" className="text-label-md font-semibold text-on-surface-variant hover:text-primary transition-colors">About</a>
          <a href="#catalog" className="text-label-md font-semibold text-on-surface-variant hover:text-primary transition-colors">Catalog</a>
          <a href="#services" className="text-label-md font-semibold text-on-surface-variant hover:text-primary transition-colors">Services</a>
          <a href="#contact" className="text-label-md font-semibold text-on-surface-variant hover:text-primary transition-colors">Contact</a>
          <Link to="/login" className="btn-primary flex items-center gap-2">
            Access Portal
            <MdArrowForward />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-10 pt-24 pb-16 overflow-hidden relative border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/10 text-secondary rounded-full border border-secondary/20 mb-8"
          >
            <LiveDot />
            <span className="text-label-sm font-bold uppercase tracking-widest">Est. 1946 — A Legacy of Excellence</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-headline text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-tighter text-on-surface mb-8"
          >
            Illuminating <span className="italic text-primary">Minds</span> <br /> 
            Since <span className="text-secondary">Seventy</span> Years.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-on-surface-variant max-w-xl mb-12 leading-relaxed"
          >
            The central repository of knowledge at Dr. Harisingh Gour Vishwavidyalaya, 
            housing over 400,000 volumes and cutting-edge digital resources for the global scholar.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6 items-center"
          >
            <Link to="/student/catalog" className="btn-primary text-xl py-5 px-12 shadow-2xl shadow-primary/20">
              Explore 400k+ Volumes
            </Link>
            <button className="btn-secondary text-xl py-5 px-12">
              Virtual Campus Tour
            </button>
          </motion.div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] -z-10"></div>
      </section>

      {/* Marquee Ticker */}
      <div className="bg-on-surface py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1,2,3,4].map((i) => (
            <div key={i} className="flex items-center gap-16 mx-8">
              {["400,000+ Books", "Central University", "Est. 1946", "RFID Integrated", "Digital IR Access", "Remote Access"].map((item) => (
                <span key={item} className="font-mono text-sm uppercase tracking-[0.3em] text-surface/30 flex items-center gap-6">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="px-10 py-32 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-card overflow-hidden shadow-2xl"
            >
              <img 
                src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAEtOPm6WU-aL5qQtr94Px-bO37RpAgrdKKTDqIwBrN0ZX-VUNpxYOyWxfcs0r-CnfBpf19-P9i5hDavBzCLvK4dwfGVfZ6nbzCrvrfoaf4ALtOsjwyC24kgZMlhJZZKYnO5MY-SwA=s1360-w1360-h1020-rw" 
                alt="Library Heritage"
                className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            </motion.div>
            
            <div>
              <SectionHeading title="A Heritage of Wisdom" subtitle="Our History" />
              <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                Established in 1946 along with the University, the Jawaharlal Nehru Library stands as a beacon of academic excellence in Sagar. 
                As a Central University library, we serve as the intellectual hub for thousands of students, researchers, and faculty members.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-background rounded-2xl border border-outline-variant/30">
                  <MdTimeline className="text-3xl text-primary mb-4" />
                  <h4 className="text-xl font-headline italic mb-2">1946</h4>
                  <p className="text-label-sm text-on-surface-variant opacity-70">Foundation year of the Library and University.</p>
                </div>
                <div className="p-6 bg-background rounded-2xl border border-outline-variant/30">
                  <MdAutoStories className="text-3xl text-secondary mb-4" />
                  <h4 className="text-xl font-headline italic mb-2">4 Lakh+</h4>
                  <p className="text-label-sm text-on-surface-variant opacity-70">Physical volumes in our permanent collection.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2x2 Bento Grid (Core Ecosystem) */}
      <section id="catalog" className="px-10 py-32 max-w-7xl mx-auto">
        <SectionHeading title="Digital Ecosystem" subtitle="Platform Pillars" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card 1: Occupancy */}
          <BentoCard className="flex flex-col justify-between bg-secondary/5 border-secondary/10">
            <div>
              <div className="p-4 bg-secondary/10 rounded-2xl w-fit text-secondary mb-6 group-hover:scale-110 transition-transform">
                <MdSensors className="text-4xl" />
              </div>
              <h3 className="font-headline text-3xl mb-4 italic">Live Occupancy</h3>
              <p className="text-base text-on-surface-variant mb-8">Integrated sensor network providing real-time data on seat availability across all wings.</p>
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-surface rounded-full overflow-hidden border border-outline-variant/30">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '75%' }}
                  className="h-full bg-secondary rounded-full" 
                />
              </div>
              <div className="flex justify-between text-label-md font-bold text-on-surface-variant">
                <span>Current Campus Load</span>
                <span className="text-secondary">High Activity</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Catalog */}
          <BentoCard className="flex flex-col justify-between bg-primary/5 border-primary/10">
            <div>
              <div className="p-4 bg-primary/10 rounded-2xl w-fit text-primary mb-6 group-hover:scale-110 transition-transform">
                <MdLibraryBooks className="text-4xl" />
              </div>
              <h3 className="font-headline text-3xl mb-4 italic">Union Catalog</h3>
              <p className="text-base text-on-surface-variant mb-8">Unified search across central and departmental libraries. Access journals, theses, and e-books.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-5xl font-headline tracking-tighter text-primary">400k</div>
              <div className="h-10 w-px bg-outline-variant/30"></div>
              <button className="text-label-sm font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                OPAC Search <MdArrowForward />
              </button>
            </div>
          </BentoCard>

          {/* Card 3: Remote Access */}
          <BentoCard className="flex flex-col justify-between bg-tertiary/5 border-tertiary/10">
            <div>
              <div className="p-4 bg-tertiary/10 rounded-2xl w-fit text-tertiary mb-6 group-hover:scale-110 transition-transform">
                <MdPublic className="text-4xl" />
              </div>
              <h3 className="font-headline text-3xl mb-4 italic">Off-Campus Access</h3>
              <p className="text-base text-on-surface-variant mb-8">Secure IDP-based remote login. Access premium e-resources from anywhere in the world.</p>
            </div>
            <button className="btn-secondary w-fit py-3 px-8">IDP Login</button>
          </BentoCard>

          {/* Card 4: Spaces */}
          <BentoCard className="flex flex-col justify-between bg-on-surface/5 border-outline-variant/30">
            <div>
              <div className="p-4 bg-on-surface/10 rounded-2xl w-fit text-on-surface mb-6 group-hover:scale-110 transition-transform">
                <MdExplore className="text-4xl" />
              </div>
              <h3 className="font-headline text-3xl mb-4 italic">Smart Hubs</h3>
              <p className="text-base text-on-surface-variant mb-8">Dedicated research cubicles, group study rooms, and high-speed digital terminals.</p>
            </div>
            <div className="flex items-center gap-4 text-primary font-bold">
               <MdHub className="text-2xl" />
               <span className="text-label-md uppercase tracking-widest">Reserve a Terminal</span>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Services/Features Strip */}
      <section id="services" className="bg-primary py-32 text-white">
        <div className="max-w-7xl mx-auto px-10">
          <SectionHeading title="Scholarly Services" subtitle="Premium Facilities" light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
               <MdSecurity className="text-5xl text-secondary" />
               <h4 className="text-3xl font-headline italic">RFID Security</h4>
               <p className="text-lg opacity-70">Automated check-out and security gates for seamless physical asset management.</p>
            </div>
            <div className="space-y-6">
               <MdHistory className="text-5xl text-secondary" />
               <h4 className="text-3xl font-headline italic">Digital Archives</h4>
               <p className="text-lg opacity-70">Extensive collection of digitized manuscripts and archival records available online.</p>
            </div>
            <div className="space-y-6">
               <MdPublic className="text-5xl text-secondary" />
               <h4 className="text-3xl font-headline italic">N-LIST & DelNet</h4>
               <p className="text-lg opacity-70">Inter-library loan and resource sharing with top institutions across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-surface py-32">
        <div className="max-w-7xl mx-auto px-10">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
              {[
                { num: "12,000+", label: "E-Journals" },
                { num: "5,000+", label: "Theses/Dissertations" },
                { num: "30,000+", label: "Active Researchers" },
                { num: "24/7", label: "Cloud IR Access" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl font-headline tracking-tighter text-on-surface mb-2">{stat.num}</div>
                  <div className="text-label-sm font-bold uppercase tracking-[0.2em] text-primary">{stat.label}</div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-10 py-32 bg-background border-t border-outline-variant/10">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
               <div className="lg:col-span-5">
                  <SectionHeading title="Get in Touch" subtitle="Support & Queries" />
                  <p className="text-xl text-on-surface-variant mb-12">
                    Our team is here to assist you with research support, membership queries, and technical assistance.
                  </p>
                  <div className="space-y-8">
                     <div className="flex items-center gap-6 group">
                        <div className="p-4 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                           <MdMail className="text-2xl" />
                        </div>
                        <div>
                           <p className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Email Support</p>
                           <p className="text-xl font-headline italic">library@dhsgsu.edu.in</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6 group">
                        <div className="p-4 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-white transition-all">
                           <MdPhone className="text-2xl" />
                        </div>
                        <div>
                           <p className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Call Us</p>
                           <p className="text-xl font-headline italic">+91 (7582) 264xxx</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6 group">
                        <div className="p-4 bg-on-surface/10 text-on-surface rounded-xl group-hover:bg-on-surface group-hover:text-white transition-all">
                           <MdLocationOn className="text-2xl" />
                        </div>
                        <div>
                           <p className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Visit Us</p>
                           <p className="text-xl font-headline italic">Sagar, Madhya Pradesh, 470003</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="lg:col-span-7">
                  <div className="bg-surface p-10 rounded-card shadow-bento border border-outline-variant/30">
                     <h3 className="text-3xl font-headline italic mb-8">Send a Message</h3>
                     <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-label-sm font-bold uppercase text-on-surface-variant opacity-60">Name</label>
                              <input type="text" className="w-full p-4 bg-background border border-outline-variant/30 rounded-xl focus:border-primary outline-none transition-all" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-label-sm font-bold uppercase text-on-surface-variant opacity-60">Email</label>
                              <input type="email" className="w-full p-4 bg-background border border-outline-variant/30 rounded-xl focus:border-primary outline-none transition-all" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-label-sm font-bold uppercase text-on-surface-variant opacity-60">Subject</label>
                           <input type="text" className="w-full p-4 bg-background border border-outline-variant/30 rounded-xl focus:border-primary outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-label-sm font-bold uppercase text-on-surface-variant opacity-60">Message</label>
                           <textarea rows={4} className="w-full p-4 bg-background border border-outline-variant/30 rounded-xl focus:border-primary outline-none transition-all resize-none" />
                        </div>
                        <button type="submit" className="btn-primary w-full py-5 text-xl">Submit Inquiry</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="px-10 py-16 bg-on-surface text-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 border-b border-surface/10 pb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <MdSchool className="text-4xl text-secondary" />
                <span className="text-3xl font-headline italic">Jawaharlal Nehru Library</span>
              </div>
              <p className="text-lg opacity-50 max-w-sm">
                Serving the academic community of Dr. Harisingh Gour University since 1946. 
                A legacy of wisdom, preserved for the future.
              </p>
            </div>
            <div>
              <h5 className="text-label-md font-bold uppercase tracking-widest mb-6 text-secondary">Quick Links</h5>
              <ul className="space-y-4 opacity-70">
                <li><a href="#" className="hover:text-secondary transition-colors">Catalog (OPAC)</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Digital Repository</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Theses Database</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">E-Resources</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-label-md font-bold uppercase tracking-widest mb-6 text-secondary">Institutional</h5>
              <ul className="space-y-4 opacity-70">
                <li><a href="https://www.dhsgsu.edu.in" className="hover:text-secondary transition-colors">University Website</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">NIRF Data</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Anti-Plagiarism</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-label-sm font-mono tracking-widest">
            <span>© 2026 DR. HARISINGH GOUR VISHWAVIDYALAYA</span>
            <div className="flex gap-8">
              <span>DESIGNED BY NEXUS INSTITUTIONAL</span>
              <span>PRIVACY POLICY</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}