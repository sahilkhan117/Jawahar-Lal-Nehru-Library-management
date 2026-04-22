import React from 'react';
import { MdAddCircle, MdExpandMore, MdAddPhotoAlternate, MdSend, MdFilterList, MdAutorenew, MdSchedule, MdCheckCircle } from 'react-icons/md';

export default function AdminComplaints() {
  return (
    <div className="space-y-card-gap">
      
<div className="mb-8">
<h2 className="font-headline-md text-headline-md text-on-surface mb-2">Facility Reports</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Submit maintenance requests or track existing issues within the library.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-container-padding border border-surface-container-highest/50">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-6 flex items-center gap-2">
<MdAddCircle className="text-primary" />
                        New Report
                    </h3>
<form className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface-variant">Issue Type</label>
<div className="relative">
<select className="w-full appearance-none bg-surface-container border-none rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all cursor-pointer">
<option disabled="" selected="" value="">Select category...</option>
<option value="hvac">Temperature / HVAC</option>
<option value="plumbing">Restroom / Plumbing</option>
<option value="electrical">Lighting / Electrical</option>
<option value="furniture">Broken Furniture</option>
<option value="cleanliness">Spill / Cleanliness</option>
<option value="other">Other</option>
</select>
<MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
</div>
</div>

<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface-variant">Specific Location</label>
<input className="w-full bg-surface-container border-none rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all placeholder:text-outline-variant" placeholder="e.g. 3rd Floor North Wing, Desk 42" type="text"/>
</div>
</div>

<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface-variant">Description</label>
<textarea className="w-full bg-surface-container border-none rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all placeholder:text-outline-variant resize-none" placeholder="Please provide details about the issue..." rows="4"></textarea>
</div>

<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface-variant">Attach Photo (Optional)</label>
<div className="border-2 border-dashed border-outline-variant rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low transition-colors group">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary-container group-hover:text-primary transition-colors">
<MdAddPhotoAlternate className="text-outline group-hover:text-primary" />
</div>
<p className="font-label-md text-label-md text-on-surface mb-1">Click to upload or drag and drop</p>
<p className="font-label-sm text-label-sm text-outline-variant">JPG, PNG, or HEIC (Max. 5MB)</p>
</div>
</div>

<div className="flex justify-end pt-4 border-t border-surface-variant">
<button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md shadow-sm hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-2" type="button">
                                Submit Report
                                <MdSend className="text-[18px]" />
</button>
</div>
</form>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-container-padding border border-surface-container-highest/50 flex flex-col h-full">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Activity</h3>
<button className="text-primary hover:text-on-primary-fixed-variant transition-colors">
<MdFilterList className="" />
</button>
</div>

<div className="relative pl-4 flex-1">

<div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-surface-variant"></div>
<div className="space-y-6">

<div className="relative pl-6">
<div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
<div className="mb-1 flex items-center justify-between">
<span className="inline-flex items-center gap-1 bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase">
<MdAutorenew className="text-[14px]" />
                                        In Progress
                                    </span>
<span className="font-label-sm text-label-sm text-outline-variant">Today, 9:41 AM</span>
</div>
<p className="font-label-md text-label-md text-on-surface font-semibold">Flickering light above Study Desk 12</p>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm line-clamp-2">Maintenance team notified. Waiting on replacement bulb delivery.</p>
</div>

<div className="relative pl-6">
<div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-tertiary ring-4 ring-surface-container-lowest"></div>
<div className="mb-1 flex items-center justify-between">
<span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase">
<MdSchedule className="text-[14px]" />
                                        Pending
                                    </span>
<span className="font-label-sm text-label-sm text-outline-variant">Yesterday</span>
</div>
<p className="font-label-md text-label-md text-on-surface font-semibold">Coffee spill in Quiet Reading Room</p>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">Ticket submitted. Awaiting janitorial staff assignment.</p>
</div>

<div className="relative pl-6">
<div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-surface-container-lowest"></div>
<div className="mb-1 flex items-center justify-between">
<span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase">
<MdCheckCircle className="text-[14px]" />
                                        Resolved
                                    </span>
<span className="font-label-sm text-label-sm text-outline-variant">Oct 24</span>
</div>
<p className="font-label-md text-label-md text-on-surface font-semibold">HVAC too cold on 2nd Floor</p>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">Temperature adjusted to standard 72°F. Vents inspected.</p>
</div>
</div>
</div>
<button className="w-full mt-6 py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors">
                        View All History
                    </button>
</div>
</div>

    </div>
  );
}
