import React from 'react';
import { MdBadge, MdSchool, MdCalendarToday, MdCheckCircle, MdVerified, MdHistory, MdPayments, MdWorkspacePremium, MdSecurity, MdDownload } from 'react-icons/md';

export default function StudentDashboard() {
  return (
    <div className="space-y-card-gap">
      
<div className="max-w-6xl mx-auto space-y-card-gap">

<div className="mb-8">
<h2 className="font-headline-md text-headline-md text-on-surface">Profile &amp; Clearances</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your account details and academic clearance status.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap">

<div className="lg:col-span-12 bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center md:items-start gap-6 border border-outline-variant/30">
<div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-surface shadow-sm shrink-0">
<img alt="Student Photo" className="w-full h-full object-cover" data-alt="Close up portrait of a young professional male in a light grey shirt against a neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy5uLb8hdaMiT_fHhZCUWEhKbxzAC5Ig7KHvB1VuuPee88Bl_j-9gk1glDKOGzQEUt1nHwsScCEQwHkijzw-amyWIQMgdMekvVTt75s3DvWm861-SfO22o8dLPLuxra2x8YBwCsGs8GhweZboUPy0pHmDK1bHP_3vGhoW91odhOyK0iHwNnJ25oT9dI5ZhlnXCYkgsWEaIhtuEkaqL6vKPN4G-PXj5wmQ0Iw1ta78SkPIz23aSdng6KQyyZ1kLU9YAvEB8XlsHBHDW"/>
</div>
<div className="flex-1 text-center md:text-left space-y-2">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Alexander Jenkins</h3>
<div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-md text-label-md border border-outline-variant/50">
<MdBadge className="text-[16px]" />
                                    ENR-2021-8492
                                </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-md text-label-md border border-outline-variant/50">
<MdSchool className="text-[16px]" />
                                    Computer Science
                                </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-md text-label-md border border-outline-variant/50">
<MdCalendarToday className="text-[16px]" />
                                    Class of 2025
                                </span>
</div>
</div>
<div className="hidden md:flex flex-col items-end justify-center px-4 border-l border-outline-variant/30">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Account Status</span>
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-md text-label-md">
<MdCheckCircle className="text-[14px]" />
                                Active
                            </span>
</div>
</div>

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col justify-center items-center text-center relative overflow-hidden">

<div className="absolute inset-0 bg-gradient-to-br from-secondary-container/5 to-transparent pointer-events-none"></div>
<div className="h-20 w-20 rounded-full bg-secondary-container/20 flex items-center justify-center mb-6 ring-8 ring-secondary-container/10">
<MdVerified className="fill text-[40px] text-secondary" />
</div>
<h4 className="font-display-lg text-display-lg text-on-surface mb-2">Clearance Granted</h4>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto mb-8">
                            All library accounts are settled. You have no outstanding fines or unreturned materials.
                        </p>
<div className="w-full bg-surface-container-low rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/50">
<div className="flex items-center gap-3">
<MdHistory className="text-outline" />
<div className="text-left">
<p className="font-label-sm text-label-sm text-outline">Last System Check</p>
<p className="font-label-md text-label-md text-on-surface">Today, 09:41 AM</p>
</div>
</div>
<div className="h-8 w-px bg-outline-variant hidden sm:block"></div>
<div className="flex items-center gap-3">
<MdPayments className="text-outline" />
<div className="text-left">
<p className="font-label-sm text-label-sm text-outline">Current Balance</p>
<p className="font-label-md text-label-md text-on-surface">$0.00</p>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col">
<div className="flex items-center justify-between mb-6">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Digital Badge</h4>
<MdWorkspacePremium className="text-outline" />
</div>

<div className="flex-1 bg-surface-container rounded-lg border border-outline-variant/50 p-6 flex flex-col items-center justify-center relative overflow-hidden mb-6">

<div className="absolute inset-0 bg-gradient-to-tr from-surface-tint/5 to-secondary/5"></div>
<div className="relative z-10 text-center">
<MdSecurity className="fill text-[64px] text-surface-tint mb-2 drop-shadow-sm" />
<h5 className="font-headline-sm text-headline-sm text-on-primary-fixed">No-Dues Verified</h5>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Library Systems Dept.</p>
<div className="mt-4 inline-block bg-surface-container-lowest px-3 py-1 rounded text-xs font-mono text-outline border border-outline-variant/50">
                                    ID: ND-2024-883A
                                </div>
</div>
</div>

<button className="w-full bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md text-label-md py-4 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]">
<MdDownload className="text-[20px]" />
                            Generate Certificate
                        </button>
</div>
</div>
</div>

    </div>
  );
}
