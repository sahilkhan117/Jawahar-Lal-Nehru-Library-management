import React from 'react';
import { MdSearch, MdNotifications, MdHelpOutline, MdFilterList, MdCampaign, MdWarning, MdTrendingUp, MdHourglassBottom, MdPriorityHigh, MdAccountBalanceWallet, MdCheckCircle, MdKeyboardArrowDown, MdMail, MdSchedule, MdInfo, MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function LibrarianDefaulters() {
  return (
    <div className="space-y-card-gap">
      

<header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md font-['Manrope'] text-sm tracking-tight border-b border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sticky top-0 z-30 flex items-center justify-between w-full h-16 px-8 max-w-full">
<div className="flex items-center gap-4 flex-1">

<div className="relative w-64 hidden sm:block">
<MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
<input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:bg-white transition-all" placeholder="Search students, books..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200 active:scale-95 transition-transform flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-low">
<MdNotifications className="" />
</button>
<button className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200 active:scale-95 transition-transform flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-low">
<MdHelpOutline className="" />
</button>
<div className="w-px h-6 bg-outline-variant mx-2"></div>
<button className="active:scale-95 transition-transform">
<img alt="Librarian profile picture" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" data-alt="portrait of a professional woman with glasses smiling subtly in a bright modern office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd6L_MalbEXkTF-MwV-RYOnTBIh0-jaQzxR6VkqCnAnqjHzM0NYk3f-QUPYN1Y1ThkB43Oomazl_as_p7d9nN4z2azxwXYvQjZodORxc_WotZKODMedYPYVUW9RCRDSHeK-3VhofT6M9buxW2UrzERxkx0QR-Eyo2oxyLYrHGjYgUuiTxaZy0yNTDq3e_6Oc0yy2c3yQF3EZtpdtt2a10SJ7DUVH7ZbWqddGxZU87Hsd0gi8iDB-9NzrgyB4DlrHqfmUPVNd67qEvY"/>
</button>
</div>
</header>

<div className="p-container-padding flex-1 flex flex-col gap-section-margin max-w-7xl mx-auto w-full">

<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
<div>
<h1 className="font-display-lg text-display-lg text-on-surface mb-2">Defaulters Action Center</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Manage and track overdue library assets.</p>
</div>
<div className="flex gap-3">
<button className="bg-surface border border-outline-variant text-on-surface font-label-md text-label-md py-2 px-4 rounded-xl flex items-center gap-2 hover:bg-surface-container-low transition-colors">
<MdFilterList className="" />
                        Filter
                    </button>
<button className="bg-primary text-on-primary font-label-md text-label-md py-2 px-6 rounded-xl flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-colors shadow-[0_4px_14px_rgba(0,74,198,0.2)]">
<MdCampaign className="" />
                        Nudge All
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap">
<div className="bg-white rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-surface-variant/50 flex flex-col gap-2">
<div className="flex items-center gap-2 text-error">
<MdWarning className="text-xl" />
<span className="font-label-md text-label-md text-on-surface-variant">Total Overdue Items</span>
</div>
<div className="font-display-lg text-[40px] leading-tight text-on-surface">142</div>
<div className="font-label-sm text-label-sm text-error flex items-center gap-1 mt-1">
<MdTrendingUp className="text-[16px]" />
                        +12 since last week
                    </div>
</div>
<div className="bg-white rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-surface-variant/50 flex flex-col gap-2">
<div className="flex items-center gap-2 text-tertiary">
<MdHourglassBottom className="text-xl" />
<span className="font-label-md text-label-md text-on-surface-variant">Critical Defaults (&gt;14 Days)</span>
</div>
<div className="font-display-lg text-[40px] leading-tight text-on-surface">38</div>
<div className="font-label-sm text-label-sm text-outline flex items-center gap-1 mt-1">
<MdPriorityHigh className="text-[16px]" />
                        Immediate action required
                    </div>
</div>
<div className="bg-white rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-surface-variant/50 flex flex-col gap-2">
<div className="flex items-center gap-2 text-primary">
<MdAccountBalanceWallet className="text-xl" />
<span className="font-label-md text-label-md text-on-surface-variant">Estimated Fines Accrued</span>
</div>
<div className="font-display-lg text-[40px] leading-tight text-on-surface">$450.50</div>
<div className="font-label-sm text-label-sm text-secondary flex items-center gap-1 mt-1">
<MdCheckCircle className="text-[16px]" />
                        $120 collected today
                    </div>
</div>
</div>

<div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-surface-variant/50 overflow-hidden flex flex-col">
<div className="p-6 border-b border-surface-variant/50 flex justify-between items-center bg-surface-container-lowest">
<h2 className="font-headline-sm text-headline-sm text-on-surface">Prioritized Defaulters</h2>
<div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
<span>Sort by:</span>
<button className="flex items-center gap-1 text-on-surface font-medium hover:text-primary transition-colors">
                            Days Overdue
                            <MdKeyboardArrowDown className="text-[18px]" />
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-surface-variant/50 bg-surface-container-low/30">
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Student Details</th>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Asset Information</th>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Due Date</th>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant/30">

<tr className="hover:bg-surface-container-low/20 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-error-container/30 text-error flex items-center justify-center font-headline-sm text-headline-sm">
                                            EJ
                                        </div>
<div>
<div className="font-label-md text-label-md text-on-surface">Eleanor James</div>
<div className="font-body-sm text-[13px] text-outline">ID: ST-99281</div>
</div>
</div>
</td>
<td className="py-4 px-6">
<div className="font-label-md text-label-md text-on-surface">The Principles of Quantum Mechanics</div>
<div className="font-body-sm text-[13px] text-outline">P.A.M. Dirac • Barcode: 88219</div>
</td>
<td className="py-4 px-6">
<div className="font-body-md text-body-md text-on-surface">Oct 12, 2023</div>
</td>
<td className="py-4 px-6">
<div className="inline-flex items-center gap-1.5 bg-error-container text-on-error-container font-label-sm text-label-sm px-3 py-1 rounded-full">
<MdWarning className="text-[14px]" />
                                        21 Days Overdue
                                    </div>
</td>
<td className="py-4 px-6 text-right">
<button className="bg-surface border border-outline-variant text-primary font-label-sm text-label-sm py-1.5 px-3 rounded-lg hover:bg-primary-fixed hover:border-primary-fixed transition-colors flex items-center gap-1.5 ml-auto">
<MdMail className="text-[16px]" />
                                        Remind
                                    </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/20 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-tertiary-container/10 text-tertiary flex items-center justify-center font-headline-sm text-headline-sm">
                                            MW
                                        </div>
<div>
<div className="font-label-md text-label-md text-on-surface">Marcus Webb</div>
<div className="font-body-sm text-[13px] text-outline">ID: ST-44102</div>
</div>
</div>
</td>
<td className="py-4 px-6">
<div className="font-label-md text-label-md text-on-surface">Macroeconomics, 8th Ed.</div>
<div className="font-body-sm text-[13px] text-outline">Gregory Mankiw • Barcode: 11092</div>
</td>
<td className="py-4 px-6">
<div className="font-body-md text-body-md text-on-surface">Oct 19, 2023</div>
</td>
<td className="py-4 px-6">
<div className="inline-flex items-center gap-1.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-3 py-1 rounded-full">
<MdSchedule className="text-[14px]" />
                                        14 Days Overdue
                                    </div>
</td>
<td className="py-4 px-6 text-right">
<button className="bg-surface border border-outline-variant text-primary font-label-sm text-label-sm py-1.5 px-3 rounded-lg hover:bg-primary-fixed hover:border-primary-fixed transition-colors flex items-center gap-1.5 ml-auto">
<MdMail className="text-[16px]" />
                                        Remind
                                    </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/20 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-headline-sm text-headline-sm">
                                            SK
                                        </div>
<div>
<div className="font-label-md text-label-md text-on-surface">Sarah Kline</div>
<div className="font-body-sm text-[13px] text-outline">ID: ST-10994</div>
</div>
</div>
</td>
<td className="py-4 px-6">
<div className="font-label-md text-label-md text-on-surface">Design of Everyday Things</div>
<div className="font-body-sm text-[13px] text-outline">Don Norman • Barcode: 55430</div>
</td>
<td className="py-4 px-6">
<div className="font-body-md text-body-md text-on-surface">Oct 28, 2023</div>
</td>
<td className="py-4 px-6">
<div className="inline-flex items-center gap-1.5 bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-3 py-1 rounded-full">
<MdInfo className="text-[14px]" />
                                        5 Days Overdue
                                    </div>
</td>
<td className="py-4 px-6 text-right">
<button className="bg-surface border border-outline-variant text-primary font-label-sm text-label-sm py-1.5 px-3 rounded-lg hover:bg-primary-fixed hover:border-primary-fixed transition-colors flex items-center gap-1.5 ml-auto">
<MdMail className="text-[16px]" />
                                        Remind
                                    </button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-4 border-t border-surface-variant/50 bg-surface-container-lowest flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline">Showing 1-3 of 142 defaulters</span>
<div className="flex gap-1">
<button className="w-8 h-8 rounded-md flex items-center justify-center text-outline hover:bg-surface-variant hover:text-on-surface transition-colors disabled:opacity-50" disabled="">
<MdChevronLeft className="text-[20px]" />
</button>
<button className="w-8 h-8 rounded-md flex items-center justify-center bg-primary text-on-primary font-label-sm text-label-sm">1</button>
<button className="w-8 h-8 rounded-md flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors font-label-sm text-label-sm">2</button>
<button className="w-8 h-8 rounded-md flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors font-label-sm text-label-sm">3</button>
<span className="w-8 h-8 flex items-center justify-center text-outline">...</span>
<button className="w-8 h-8 rounded-md flex items-center justify-center text-outline hover:bg-surface-variant hover:text-on-surface transition-colors">
<MdChevronRight className="text-[20px]" />
</button>
</div>
</div>
</div>
</div>

    </div>
  );
}
