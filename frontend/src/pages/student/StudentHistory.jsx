import React from 'react';
import { MdDownload, MdBook, MdHistoryToggleOff, MdHeadphones, MdTabletMac } from 'react-icons/md';

export default function StudentHistory() {
  return (
    <div className="space-y-card-gap">
      

<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface mb-2">Reading &amp; Activity History</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Track your current loans and past reading habits.</p>
</div>
<button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md px-4 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors ambient-shadow">
<MdDownload className="text-lg" />
                Export History
            </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-card-gap md:gap-gutter">

<div className="col-span-1 md:col-span-12 bg-surface-container-lowest rounded-2xl ambient-shadow p-6 overflow-hidden">
<div className="flex items-center gap-3 mb-6">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
<MdBook className="text-sm" />
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Currently Checked Out</h3>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-surface-variant">
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Book Title</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Author</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Checked Out</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Due Date</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface">
<tr className="border-b border-surface-container hover:bg-surface-container-low transition-colors group">
<td className="py-4 px-4 font-medium flex items-center gap-3">
<div className="w-10 h-14 bg-surface-variant rounded flex-shrink-0 bg-cover bg-center" data-alt="Cover of a classic finance book with subtle geometric patterns" ></div>
                                    The Intelligent Investor
                                </td>
<td className="py-4 px-4 text-on-surface-variant">Benjamin Graham</td>
<td className="py-4 px-4 text-on-surface-variant">Oct 12, 2023</td>
<td className="py-4 px-4 font-medium">Nov 02, 2023</td>
<td className="py-4 px-4">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container/30 text-on-secondary-container border border-secondary-container/50">
                                        Safe
                                    </span>
</td>
</tr>
<tr className="border-b border-surface-container hover:bg-surface-container-low transition-colors group">
<td className="py-4 px-4 font-medium flex items-center gap-3">
<div className="w-10 h-14 bg-surface-variant rounded flex-shrink-0 bg-cover bg-center" data-alt="Abstract minimal book cover featuring intersecting shapes" ></div>
                                    Thinking, Fast and Slow
                                </td>
<td className="py-4 px-4 text-on-surface-variant">Daniel Kahneman</td>
<td className="py-4 px-4 text-on-surface-variant">Sep 28, 2023</td>
<td className="py-4 px-4 font-medium">Oct 19, 2023</td>
<td className="py-4 px-4">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-tertiary-fixed/40 text-on-tertiary-fixed border border-tertiary-fixed/60">
                                        Due Soon
                                    </span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-4 px-4 font-medium flex items-center gap-3">
<div className="w-10 h-14 bg-surface-variant rounded flex-shrink-0 bg-cover bg-center" data-alt="Dark dramatic book cover with bold typography" ></div>
                                    Principles
                                </td>
<td className="py-4 px-4 text-on-surface-variant">Ray Dalio</td>
<td className="py-4 px-4 text-on-surface-variant">Sep 10, 2023</td>
<td className="py-4 px-4 font-medium text-error">Oct 01, 2023</td>
<td className="py-4 px-4">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-error-container/50 text-on-error-container border border-error-container/70">
                                        Overdue
                                    </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="col-span-1 md:col-span-12 bg-surface-container-lowest rounded-2xl ambient-shadow p-6 overflow-hidden">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center">
<MdHistoryToggleOff className="text-sm" />
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Reading History Log</h3>
</div>
<div className="flex gap-2">
<select className="bg-surface border border-outline-variant text-on-surface font-label-md text-label-md rounded-lg px-3 py-1.5 focus:ring-primary focus:border-primary">
<option>All Time</option>
<option>This Year</option>
<option>Last Year</option>
</select>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-surface-variant">
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Book Title</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Author</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Returned Date</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Type</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface">
<tr className="border-b border-surface-container hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium">A Random Walk Down Wall Street</td>
<td className="py-3 px-4 text-on-surface-variant">Burton G. Malkiel</td>
<td className="py-3 px-4 text-on-surface-variant">Aug 15, 2023</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 text-xs font-medium text-surface-tint">
<MdBook className="text-[14px]" /> Physical
                                    </span>
</td>
</tr>
<tr className="border-b border-surface-container hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium">Shoe Dog</td>
<td className="py-3 px-4 text-on-surface-variant">Phil Knight</td>
<td className="py-3 px-4 text-on-surface-variant">Jul 02, 2023</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
<MdHeadphones className="text-[14px]" /> Audio
                                    </span>
</td>
</tr>
<tr className="border-b border-surface-container hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium">The Lean Startup</td>
<td className="py-3 px-4 text-on-surface-variant">Eric Ries</td>
<td className="py-3 px-4 text-on-surface-variant">May 20, 2023</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 text-xs font-medium text-surface-tint">
<MdBook className="text-[14px]" /> Physical
                                    </span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-medium">Zero to One</td>
<td className="py-3 px-4 text-on-surface-variant">Peter Thiel</td>
<td className="py-3 px-4 text-on-surface-variant">Apr 11, 2023</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 text-xs font-medium text-tertiary">
<MdTabletMac className="text-[14px]" /> Digital
                                    </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

    </div>
  );
}
