import React from 'react';
import { MdAdd, MdEdit, MdKey, MdBlock, MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function AdminStaff() {
  return (
    <div className="space-y-card-gap">
      

<div className="flex justify-between items-end mb-8">
<div>
<h1 className="font-headline-md text-headline-md text-on-surface mb-2">Librarian Directory</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Manage staff accounts, shifts, and access levels across all facilities.</p>
</div>
<button className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all active:scale-95">
<MdAdd className="" />
                    Add New Librarian
                </button>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant/20">
<tr>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Name</th>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Employee ID</th>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Shift</th>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
<th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10">

<tr className="hover:bg-surface/50 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-4">
<img alt="Sarah Jenkins" className="w-10 h-10 rounded-full object-cover shadow-sm" data-alt="professional headshot of a smiling young woman with dark hair in a bright indoor setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5pqlKctPjDYq70voOAKB8wKpIt1xelhdXIb8KfqKbXELuK-sD2QrF6TGnl5G0vuHI4J1esDcDp2u-062_640j5-geq6GkNuOYIfTUj1ORybg7eAjj7QVER-lEXqQqzhRAxPvAFtjAvqrdXi9I6CN_0hjjdE-dbVH8FhYiuD1nQAztrPrlFT-472O9Wp-eyzgx6TCERYLiPHi5syM7SIpNMg-Xcu9YVIJb3Lr_hBZ9Mre2Zc6bzp5aEGJGG6wiNx5AWcExERVVr8tP"/>
<div>
<div className="font-label-md text-label-md text-on-surface">Sarah Jenkins</div>
<div className="font-body-md text-body-md text-on-surface-variant text-sm">Reference Desk</div>
</div>
</div>
</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">LIB-8042</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface">Morning</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm">
                                    Active
                                </span>
</td>
<td className="py-4 px-6 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary/10" title="Edit">
<MdEdit className="" />
</button>
<button className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary/10" title="Reset Password">
<MdKey className="" />
</button>
<button className="p-2 text-outline hover:text-error transition-colors rounded-full hover:bg-error/10" title="Deactivate">
<MdBlock className="" />
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface/50 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-4">
<img alt="Marcus Chen" className="w-10 h-10 rounded-full object-cover shadow-sm" data-alt="professional portrait of a man with short dark hair looking confident in a well lit modern space" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq3XznGg06KNaWQQMejDB5y_brTc3aexxVUzup6_85kxd8iV7bNbfm6fW_1MEu36mODXt9v6CZzI7mwbEXgKItrlAJygPQsxdOIKSnj3w0hTy0qr3rXdsVpbtmQCzuQZBapZTDq9s0ye-aTt7FzrqFK23f0VY_S-5yqlByW3lgZU31U_cNAOuaWnzMxws2854tMEBmmQeRJI13Pc4fQQ1Mws8qkYp4bLAGRB2vJgXPlVhj0dRGfb0f2vNVtigZibd3W-3x-UaR5ZCP"/>
<div>
<div className="font-label-md text-label-md text-on-surface">Marcus Chen</div>
<div className="font-body-md text-body-md text-on-surface-variant text-sm">Archives</div>
</div>
</div>
</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">LIB-9125</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface">Evening</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm">
                                    Active
                                </span>
</td>
<td className="py-4 px-6 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary/10" title="Edit">
<MdEdit className="" />
</button>
<button className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary/10" title="Reset Password">
<MdKey className="" />
</button>
<button className="p-2 text-outline hover:text-error transition-colors rounded-full hover:bg-error/10" title="Deactivate">
<MdBlock className="" />
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface/50 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-4">
<img alt="Elena Rodriguez" className="w-10 h-10 rounded-full object-cover shadow-sm grayscale opacity-80" data-alt="professional headshot of an older woman with glasses in a library or office setting with soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOVNbyFsFUG772L8TRLIL1Du3sbxj2ujsHDsQ2WAuz_MlDrwxZXIOGqqbCH7icpRgg4YU35HzevZ--eSHMtGll1gGEUCvo1AxB1SV24ez8KrHUASHptgtDAABW4gX2n9mM64M5oj9yDnTXct-YD91TzlOsqYHXpQJ2tv0V_ykcJSY4MQAovZsGDKhPY-AZvrnBsMJe56RXwQxbyS5Lil50i7hOpOf3TNYCkDF_tYLT8zuASpEyIWaQ4BLKvpjJPCN_qj_Y7SBehPbs"/>
<div>
<div className="font-label-md text-label-md text-on-surface">Elena Rodriguez</div>
<div className="font-body-md text-body-md text-on-surface-variant text-sm">Children's Section</div>
</div>
</div>
</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">LIB-4021</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface">Morning</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">
                                    On Leave
                                </span>
</td>
<td className="py-4 px-6 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary/10" title="Edit">
<MdEdit className="" />
</button>
<button className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary/10" title="Reset Password">
<MdKey className="" />
</button>
<button className="p-2 text-outline hover:text-error transition-colors rounded-full hover:bg-error/10" title="Deactivate">
<MdBlock className="" />
</button>
</div>
</td>
</tr>
</tbody>
</table>

<div className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-between bg-surface-container-low">
<span className="font-body-md text-body-md text-on-surface-variant text-sm">Showing 1-3 of 42 accounts</span>
<div className="flex gap-2">
<button className="p-2 rounded-lg text-outline hover:bg-surface-variant transition-colors disabled:opacity-50" disabled="">
<MdChevronLeft className="" />
</button>
<button className="p-2 rounded-lg text-on-surface hover:bg-surface-variant transition-colors">
<MdChevronRight className="" />
</button>
</div>
</div>
</div>

    </div>
  );
}
