import React from 'react';
import { MdSync, MdGroups, MdTrendingUp, MdAccountBalanceWallet, MdTrendingDown, MdLibraryBooks, MdDns } from 'react-icons/md';

export default function AdminDashboard() {
  return (
    <div className="space-y-card-gap">
      

<header className="mb-8 flex justify-between items-end">
<div>
<h1 className="font-headline-md text-headline-md text-on-surface mb-2 tracking-tight">Telemetry Overview</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Real-time institutional metrics and physical asset tracking.</p>
</div>
<div className="flex gap-4">
<button className="px-6 py-2.5 bg-white border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors shadow-sm">
                    Export Report
                </button>
<button className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
<MdSync className="text-sm" />
                    Live Sync
                </button>
</div>
</header>

<div className="grid grid-cols-12 gap-card-gap">

<div className="col-span-12 md:col-span-3 bg-surface-container-lowest rounded-card p-container-padding shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[160px]">
<div className="flex justify-between items-start">
<span className="font-label-md text-label-md text-on-surface-variant">Live Occupancy</span>
<MdGroups className="text-primary bg-primary/10 p-1.5 rounded-md" />
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-md text-headline-md text-on-surface">1,482</span>
<span className="font-label-sm text-label-sm text-secondary-fixed-dim bg-secondary/10 px-2 py-0.5 rounded-full flex items-center"><MdTrendingUp className="text-[12px] mr-1" /> +12%</span>
</div>
<div className="mt-4 h-8 w-full">

<svg className="w-full h-full preserve-aspect-ratio-none" viewBox="0 0 100 30">
<path d="M0,25 C20,25 30,10 50,15 C70,20 80,5 100,2" fill="none" stroke="#004ac6" strokeLinecap="round" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
<path d="M0,25 C20,25 30,10 50,15 C70,20 80,5 100,2 L100,30 L0,30 Z" fill="url(#spark-grad1)" opacity="0.2"></path>
<defs>
<linearGradient id="spark-grad1" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#004ac6"></stop>
<stop offset="100%" stopColor="#004ac6" stopOpacity="0"></stop>
</linearGradient>
</defs>
</svg>
</div>
</div>
</div>

<div className="col-span-12 md:col-span-3 bg-surface-container-lowest rounded-card p-container-padding shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[160px]">
<div className="flex justify-between items-start">
<span className="font-label-md text-label-md text-on-surface-variant">Total Fine Revenue</span>
<MdAccountBalanceWallet className="text-tertiary-container bg-tertiary-container/10 p-1.5 rounded-md" />
</div>
<div>
<div className="flex items-baseline gap-2 mt-4">
<span className="font-headline-md text-headline-md text-on-surface">$8,240</span>
<span className="font-label-sm text-label-sm text-on-error-container bg-error-container/50 px-2 py-0.5 rounded-full flex items-center"><MdTrendingDown className="text-[12px] mr-1" /> -3.4%</span>
</div>
<p className="font-label-sm text-label-sm text-outline mt-2">MTD Settlement Total</p>
</div>
</div>

<div className="col-span-12 md:col-span-3 bg-surface-container-lowest rounded-card p-container-padding shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[160px]">
<div className="flex justify-between items-start">
<span className="font-label-md text-label-md text-on-surface-variant">Active Circulation</span>
<MdLibraryBooks className="text-secondary bg-secondary/10 p-1.5 rounded-md" />
</div>
<div>
<div className="flex items-baseline gap-2 mt-4">
<span className="font-headline-md text-headline-md text-on-surface">45.2k</span>
</div>
<div className="w-full bg-surface-variant h-1.5 rounded-full mt-4 overflow-hidden">
<div className="bg-gradient-to-r from-primary to-primary-fixed-dim h-full w-[68%] rounded-full"></div>
</div>
<p className="font-label-sm text-label-sm text-outline mt-2 text-right">68% of Capacity</p>
</div>
</div>

<div className="col-span-12 md:col-span-3 bg-surface-container-lowest rounded-card p-container-padding shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[160px]">
<div className="flex justify-between items-start">
<span className="font-label-md text-label-md text-on-surface-variant">Gate System Uptime</span>
<MdDns className="text-secondary bg-secondary/10 p-1.5 rounded-md" />
</div>
<div>
<div className="flex items-baseline gap-2 mt-4">
<span className="font-headline-md text-headline-md text-on-surface">99.9%</span>
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse ml-2"></span>
</div>
<p className="font-label-sm text-label-sm text-outline mt-2">All nodes operational</p>
</div>
</div>

<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-card p-container-padding shadow-[0_8px_30px_rgba(0,0,0,0.04)] min-h-[400px] flex flex-col">
<div className="flex justify-between items-center mb-6">
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Footfall Volume Trends</h2>
<p className="font-label-sm text-label-sm text-on-surface-variant">Hourly entry/exit data across main campus gates.</p>
</div>
<div className="flex gap-2 bg-surface-variant rounded-lg p-1">
<button className="px-3 py-1 rounded text-xs font-semibold bg-white text-on-surface shadow-sm">Today</button>
<button className="px-3 py-1 rounded text-xs font-semibold text-on-surface-variant hover:text-on-surface">Week</button>
</div>
</div>
<div className="flex-1 relative w-full h-full mt-4">

<svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 250">

<line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="800" y1="20" y2="20"></line>
<line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="800" y1="80" y2="80"></line>
<line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="800" y1="140" y2="140"></line>
<line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="800" y1="200" y2="200"></line>

<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="end" x="30" y="25">3k</text>
<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="end" x="30" y="85">2k</text>
<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="end" x="30" y="145">1k</text>
<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="end" x="30" y="205">0</text>

<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="middle" x="40" y="230">08:00</text>
<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="middle" x="192" y="230">10:00</text>
<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="middle" x="344" y="230">12:00</text>
<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="middle" x="496" y="230">14:00</text>
<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="middle" x="648" y="230">16:00</text>
<text className="font-label-sm text-[10px]" fill="#737686" textAnchor="middle" x="800" y="230">18:00</text>

<defs>
<linearGradient id="colorEntries" x1="0" x2="0" y1="0" y2="1">
<stop offset="5%" stopColor="#004ac6" stopOpacity="0.3"></stop>
<stop offset="95%" stopColor="#004ac6" stopOpacity="0"></stop>
</linearGradient>
<linearGradient id="colorExits" x1="0" x2="0" y1="0" y2="1">
<stop offset="5%" stopColor="#6cf8bb" stopOpacity="0.3"></stop>
<stop offset="95%" stopColor="#6cf8bb" stopOpacity="0"></stop>
</linearGradient>
</defs>

<path d="M40,180 C150,150 250,50 344,40 C450,30 550,120 648,150 C750,180 780,140 800,100 L800,200 L40,200 Z" fill="url(#colorEntries)"></path>

<path d="M40,180 C150,150 250,50 344,40 C450,30 550,120 648,150 C750,180 780,140 800,100" fill="none" stroke="#004ac6" strokeLinecap="round" strokeWidth="3"></path>

<path d="M40,195 C150,190 250,110 344,120 C450,130 550,180 648,190 C750,200 780,160 800,170 L800,200 L40,200 Z" fill="url(#colorExits)"></path>

<path d="M40,195 C150,190 250,110 344,120 C450,130 550,180 648,190 C750,200 780,160 800,170" fill="none" stroke="#006c49" strokeLinecap="round" strokeWidth="2"></path>

<circle cx="344" cy="40" fill="#ffffff" r="5" stroke="#004ac6" strokeWidth="2"></circle>
<rect fill="#191b23" height="35" opacity="0.9" rx="4" width="70" x="310" y="-10"></rect>
<text className="font-label-md text-[12px] font-bold" fill="#ffffff" textAnchor="middle" x="345" y="8">2,840</text>
<text className="font-label-sm text-[9px]" fill="#c3c6d7" textAnchor="middle" x="345" y="20">12:00 PM</text>
</svg>
</div>
</div>

<div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-card p-container-padding shadow-[0_8px_30px_rgba(0,0,0,0.04)] min-h-[400px] flex flex-col">
<h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">Inventory Health</h2>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-6">Current physical asset status distribution.</p>
<div className="flex-1 flex flex-col items-center justify-center">

<div className="relative w-48 h-48 mb-6">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">

<circle cx="50" cy="50" fill="transparent" r="40" stroke="#f0f0fb" strokeWidth="12"></circle>

<circle className="transition-all duration-1000" cx="50" cy="50" fill="transparent" r="40" stroke="#004ac6" strokeDasharray="251.2" strokeDashoffset="100.48" strokeWidth="12"></circle>


<circle cx="50" cy="50" fill="transparent" r="40" stroke="#b4c5ff" strokeDasharray="251.2" strokeDashoffset="175.84" strokeWidth="12" transform="rotate(216 50 50)"></circle>

<circle cx="50" cy="50" fill="transparent" r="40" stroke="#ba1a1a" strokeDasharray="251.2" strokeDashoffset="226.08" strokeWidth="12" transform="rotate(324 50 50)"></circle>
</svg>

<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
<span className="font-display-lg text-headline-sm text-on-surface tracking-tight">60%</span>
<span className="font-label-sm text-label-sm text-outline">Available</span>
</div>
</div>

<div className="w-full space-y-3 px-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-sm bg-primary"></span>
<span className="font-label-md text-label-md text-on-surface-variant">Available on Shelf</span>
</div>
<span className="font-label-md text-label-md text-on-surface font-semibold">184k</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-sm bg-primary-fixed-dim"></span>
<span className="font-label-md text-label-md text-on-surface-variant">Checked Out</span>
</div>
<span className="font-label-md text-label-md text-on-surface font-semibold">92k</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-sm bg-error"></span>
<span className="font-label-md text-label-md text-on-surface-variant">Quarantine / Lost</span>
</div>
<span className="font-label-md text-label-md text-on-surface font-semibold">3.1k</span>
</div>
</div>
</div>
</div>
</div>

    </div>
  );
}
