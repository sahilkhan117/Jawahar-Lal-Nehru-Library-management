import React from 'react';
import { MdDownload, MdAdd, MdBook, MdCheckCircle, MdAssignmentInd, MdWarning, MdSearch, MdFilterList, MdShelves, MdBuild, MdSearchOff, MdMoreVert, MdChevronLeft, MdChevronRight, MdUploadFile, MdInfo } from 'react-icons/md';

export default function LibrarianInventory() {
  return (
    <div className="space-y-card-gap">
      

<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface">Inventory Management</h2>
<p className="font-body-lg text-body-lg text-outline mt-2">Manage physical assets, locations, and bulk uploads.</p>
</div>
<div className="flex gap-3">
<button className="bg-surface text-on-surface border border-outline-variant font-label-md text-label-md py-2.5 px-5 rounded-xl hover:bg-surface-variant transition-colors flex items-center gap-2">
<MdDownload className="text-[18px]" />
                    Export List
                </button>
<button className="bg-primary text-on-primary font-label-md text-label-md py-2.5 px-5 rounded-xl hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-2 shadow-sm">
<MdAdd className="text-[18px]" />
                    Add Single Book
                </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap">

<div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-card-gap">
<div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
<div className="flex items-center gap-3 mb-2">
<div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
<MdBook className="text-[18px]" />
</div>
<span className="font-label-md text-label-md text-outline">Total Books</span>
</div>
<div className="font-headline-md text-headline-md text-on-surface">14,208</div>
</div>
<div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
<div className="flex items-center gap-3 mb-2">
<div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
<MdCheckCircle className="text-[18px]" />
</div>
<span className="font-label-md text-label-md text-outline">Available</span>
</div>
<div className="font-headline-md text-headline-md text-on-surface">11,842</div>
</div>
<div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
<div className="flex items-center gap-3 mb-2">
<div className="w-8 h-8 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
<MdAssignmentInd className="text-[18px]" />
</div>
<span className="font-label-md text-label-md text-outline">Issued</span>
</div>
<div className="font-headline-md text-headline-md text-on-surface">2,140</div>
</div>
<div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
<div className="flex items-center gap-3 mb-2">
<div className="w-8 h-8 rounded-full bg-error-container/50 flex items-center justify-center text-error">
<MdWarning className="text-[18px]" />
</div>
<span className="font-label-md text-label-md text-outline">Action Needed</span>
</div>
<div className="font-headline-md text-headline-md text-error">226</div>
</div>
</div>

<div className="lg:col-span-8 bg-white rounded-[24px] shadow-soft border border-slate-100/50 flex flex-col overflow-hidden min-h-[600px]">

<div className="p-6 border-b border-surface-variant flex flex-col md:flex-row gap-4 justify-between items-center bg-white z-10">
<div className="relative w-full md:w-72">
<MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
<input className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-2.5 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant text-on-surface" placeholder="Search Title, Author, or ISBN..." type="text"/>
</div>
<div className="flex gap-2 w-full md:w-auto">
<select className="bg-surface-container-low border-none rounded-xl px-4 py-2.5 font-label-md text-label-md text-on-surface focus:ring-2 focus:ring-primary focus:bg-white appearance-none pr-10 relative">
<option>All Categories</option>
<option>Fiction</option>
<option>Non-Fiction</option>
<option>Reference</option>
</select>
<select className="bg-surface-container-low border-none rounded-xl px-4 py-2.5 font-label-md text-label-md text-on-surface focus:ring-2 focus:ring-primary focus:bg-white appearance-none pr-10">
<option>All Shelves</option>
<option>A1-A10</option>
<option>B1-B10</option>
</select>
<button className="bg-surface-container-low text-on-surface p-2.5 rounded-xl hover:bg-surface-variant transition-colors">
<MdFilterList className="text-[20px]" />
</button>
</div>
</div>

<div className="overflow-x-auto flex-1">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-surface-variant bg-surface-bright/50 font-label-sm text-label-sm text-outline uppercase tracking-wider">
<th className="p-4 pl-6 font-medium">Book Details</th>
<th className="p-4 font-medium">ISBN</th>
<th className="p-4 font-medium">Location</th>
<th className="p-4 font-medium">Status</th>
<th className="p-4 pr-6 font-medium text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant/50">

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="p-4 pl-6">
<div className="flex items-center gap-3">
<div className="w-10 h-14 bg-surface-dim rounded flex items-center justify-center shrink-0">
<MdBook className="text-outline-variant" />
</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">The Design of Everyday Things</div>
<div className="font-body-md text-body-md text-outline text-[13px] mt-0.5">Don Norman</div>
</div>
</div>
</td>
<td className="p-4 font-body-md text-body-md text-on-surface-variant">978-0465050659</td>
<td className="p-4">
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">
<MdShelves className="text-[14px]" />
                                        Shelf D-12
                                    </div>
</td>
<td className="p-4">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                                        Available
                                    </span>
</td>
<td className="p-4 pr-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
<div className="flex justify-end gap-1">
<button className="p-1.5 text-outline hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Mark Damaged">
<MdBuild className="text-[18px]" />
</button>
<button className="p-1.5 text-outline hover:text-error hover:bg-error/10 rounded-lg transition-colors" title="Mark Lost">
<MdSearchOff className="text-[18px]" />
</button>
<button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors">
<MdMoreVert className="text-[18px]" />
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="p-4 pl-6">
<div className="flex items-center gap-3">
<div className="w-10 h-14 bg-surface-dim rounded flex items-center justify-center shrink-0">
<MdBook className="text-outline-variant" />
</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">Thinking, Fast and Slow</div>
<div className="font-body-md text-body-md text-outline text-[13px] mt-0.5">Daniel Kahneman</div>
</div>
</div>
</td>
<td className="p-4 font-body-md text-body-md text-on-surface-variant">978-0374533557</td>
<td className="p-4">
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">
<MdShelves className="text-[14px]" />
                                        Shelf P-04
                                    </div>
</td>
<td className="p-4">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold bg-tertiary/10 text-tertiary border border-tertiary/20">
                                        Issued
                                    </span>
</td>
<td className="p-4 pr-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
<div className="flex justify-end gap-1">
<button className="p-1.5 text-outline hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Mark Damaged">
<MdBuild className="text-[18px]" />
</button>
<button className="p-1.5 text-outline hover:text-error hover:bg-error/10 rounded-lg transition-colors" title="Mark Lost">
<MdSearchOff className="text-[18px]" />
</button>
<button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors">
<MdMoreVert className="text-[18px]" />
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="p-4 pl-6">
<div className="flex items-center gap-3">
<div className="w-10 h-14 bg-surface-dim rounded flex items-center justify-center shrink-0">
<MdBook className="text-outline-variant" />
</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">Clean Code</div>
<div className="font-body-md text-body-md text-outline text-[13px] mt-0.5">Robert C. Martin</div>
</div>
</div>
</td>
<td className="p-4 font-body-md text-body-md text-on-surface-variant">978-0132350884</td>
<td className="p-4">
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface">
<MdShelves className="text-[14px]" />
                                        Shelf C-01
                                    </div>
</td>
<td className="p-4">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold bg-error/10 text-error border border-error/20">
                                        Damaged
                                    </span>
</td>
<td className="p-4 pr-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
<div className="flex justify-end gap-1">
<button className="p-1.5 text-outline hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors" title="Mark Available">
<MdCheckCircle className="text-[18px]" />
</button>
<button className="p-1.5 text-outline hover:text-error hover:bg-error/10 rounded-lg transition-colors" title="Mark Lost">
<MdSearchOff className="text-[18px]" />
</button>
<button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors">
<MdMoreVert className="text-[18px]" />
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-4 border-t border-surface-variant flex items-center justify-between text-outline font-label-sm text-label-sm bg-white">
<div>Showing 1 to 3 of 14,208 entries</div>
<div className="flex gap-1">
<button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant transition-colors disabled:opacity-50" disabled="">
<MdChevronLeft className="text-[18px]" />
</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-medium">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant transition-colors text-on-surface">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant transition-colors text-on-surface">3</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-variant transition-colors">
<MdChevronRight className="text-[18px]" />
</button>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-card-gap">

<div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Bulk Import</h3>
<p className="font-body-md text-body-md text-outline mb-6 text-[14px]">Upload a CSV file to add multiple books at once. Format must match the system template.</p>
<div className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-surface-bright hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<MdUploadFile className="text-[24px]" />
</div>
<div className="font-label-md text-label-md text-on-surface mb-1">Drag &amp; drop your CSV here</div>
<div className="font-body-md text-body-md text-outline text-[13px] mb-4">or click to browse files</div>
<button className="bg-white border border-outline-variant text-on-surface font-label-sm text-label-sm py-2 px-4 rounded-lg hover:bg-surface-variant transition-colors shadow-sm">
                            Select File
                        </button>
</div>
<div className="mt-4 flex items-center justify-center">
<a className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1" href="#">
<MdDownload className="text-[16px]" />
                            Download CSV Template
                        </a>
</div>
</div>

<div className="bg-white p-6 rounded-[24px] shadow-soft border border-slate-100/50 flex-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Recent Alerts</h3>
<div className="space-y-3">
<div className="p-4 rounded-xl border border-error-container bg-error-container/20 flex gap-3 items-start">
<MdWarning className="text-error mt-0.5" />
<div>
<div className="font-label-md text-label-md text-on-surface">5 books marked as Lost</div>
<div className="font-body-md text-body-md text-outline text-[13px] mt-0.5">Requires replacement review.</div>
</div>
</div>
<div className="p-4 rounded-xl border border-surface-variant bg-surface-container-low flex gap-3 items-start">
<MdInfo className="text-tertiary mt-0.5" />
<div>
<div className="font-label-md text-label-md text-on-surface">Shelf A-12 Capacity</div>
<div className="font-body-md text-body-md text-outline text-[13px] mt-0.5">Approaching 90% full. Consider reorganizing.</div>
</div>
</div>
</div>
</div>
</div>
</div>

    </div>
  );
}
