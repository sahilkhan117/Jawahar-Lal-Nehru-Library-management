import React from 'react';
import { MdCloudUpload, MdGroups, MdPayments, MdSearch, MdFilterList, MdDownload, MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function LibrarianStudents() {
  return (
    <div className="space-y-card-gap">
      
<div className="p-section-margin max-w-7xl mx-auto space-y-8">

<header className="flex justify-between items-end">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Student CRM</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage enrollments, active loans, and fine balances.</p>
</div>
</header>

<div className="grid grid-cols-12 gap-card-gap">

<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-container-padding bento-shadow flex flex-col justify-center items-center border-2 border-dashed border-outline-variant hover:border-primary-container transition-colors group cursor-pointer h-48 relative overflow-hidden">

<div className="absolute inset-0 bg-gradient-to-br from-primary-fixed-dim/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="relative z-10 flex flex-col items-center text-center">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<MdCloudUpload className="text-primary text-[28px]" />
</div>
<h3 className="font-label-md text-label-md text-on-surface">Drag &amp; drop CSV files here</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 mb-4 text-sm">or click to browse from your computer</p>
<button className="font-label-sm text-label-sm text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors">
                            Browse Files
                        </button>
</div>
</div>

<div className="col-span-12 lg:col-span-4 flex flex-col gap-card-gap">
<div className="bg-surface-container-lowest rounded-xl p-container-padding bento-shadow flex-1 flex flex-col justify-center relative overflow-hidden">
<div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
<MdGroups className="text-[16px] text-primary" /> Total Students
                        </span>
<div className="font-display-lg text-display-lg text-on-surface mt-2">1,248</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-container-padding bento-shadow flex-1 flex flex-col justify-center relative overflow-hidden">
<div className="absolute right-0 top-0 w-32 h-32 bg-error/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
<MdPayments className="text-[16px] text-error" /> Outstanding Fines
                        </span>
<div className="font-headline-md text-headline-md text-error mt-2">$432.50</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl bento-shadow flex flex-col overflow-hidden">

<div className="p-container-padding border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
<div className="relative w-full sm:w-96">
<MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
<input className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container focus:bg-white transition-all placeholder:text-outline" placeholder="Search by name, ID, or course..." type="text"/>
</div>
<div className="flex gap-3 w-full sm:w-auto">
<button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors w-full sm:w-auto justify-center">
<MdFilterList className="text-[18px]" />
                            Filters
                        </button>
<button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors w-full sm:w-auto justify-center">
<MdDownload className="text-[18px]" />
                            Export
                        </button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Student Details</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Course</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">Active Borrows</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Fine Balance</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Sarah Jenkins</span>
<span className="font-body-md text-body-md text-on-surface-variant text-sm mt-0.5">ID: STU-8921</span>
</div>
</td>
<td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">BSc Computer Science</td>
<td className="px-6 py-4 text-center">
<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-container/10 text-primary font-label-md text-label-md">3</span>
</td>
<td className="px-6 py-4 text-right">
<span className="font-label-md text-label-md text-on-surface">$0.00</span>
</td>
<td className="px-6 py-4 text-right">
<button className="font-label-sm text-label-sm text-primary hover:text-primary-container px-3 py-1.5 rounded bg-primary/5 hover:bg-primary/10 transition-colors mr-2">View Profile</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Marcus Chen</span>
<span className="font-body-md text-body-md text-on-surface-variant text-sm mt-0.5">ID: STU-8922</span>
</div>
</td>
<td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">BA Architecture</td>
<td className="px-6 py-4 text-center">
<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md">0</span>
</td>
<td className="px-6 py-4 text-right">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-error-container/30 text-error font-label-md text-label-md">
                                        $12.50
                                    </span>
</td>
<td className="px-6 py-4 text-right">
<button className="font-label-sm text-label-sm text-primary hover:text-primary-container px-3 py-1.5 rounded bg-primary/5 hover:bg-primary/10 transition-colors mr-2">View Profile</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Aisha Patel</span>
<span className="font-body-md text-body-md text-on-surface-variant text-sm mt-0.5">ID: STU-8925</span>
</div>
</td>
<td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">MSc Data Science</td>
<td className="px-6 py-4 text-center">
<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-container/10 text-primary font-label-md text-label-md">1</span>
</td>
<td className="px-6 py-4 text-right">
<span className="font-label-md text-label-md text-on-surface">$0.00</span>
</td>
<td className="px-6 py-4 text-right">
<button className="font-label-sm text-label-sm text-primary hover:text-primary-container px-3 py-1.5 rounded bg-primary/5 hover:bg-primary/10 transition-colors mr-2">View Profile</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-6 py-4 border-t border-outline-variant bg-white flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface-variant text-sm">Showing 1 to 3 of 1,248 students</span>
<div className="flex gap-1">
<button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50" disabled="">
<MdChevronLeft className="text-[18px]" />
</button>
<button className="w-8 h-8 flex items-center justify-center rounded bg-primary-container/10 text-primary font-label-sm text-label-sm">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low">
<MdChevronRight className="text-[18px]" />
</button>
</div>
</div>
</div>
</div>

    </div>
  );
}
