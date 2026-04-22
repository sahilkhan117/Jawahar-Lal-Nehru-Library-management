import React from 'react';
import { MdNotifications, MdHelpOutline, MdBadge, MdBook, MdArrowForward, MdCheckCircle, MdSwapHoriz, MdKeyboardReturn, MdArrowOutward, MdSubdirectoryArrowLeft } from 'react-icons/md';

export default function LibrarianPOS() {
  return (
    <div className="space-y-card-gap">
      

<header className="md:hidden sticky top-0 z-50 flex items-center justify-between w-full h-16 px-6 max-w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
<div className="text-lg font-extrabold tracking-tighter text-on-surface font-headline-sm text-headline-sm">Kinetic Ledger</div>
<div className="flex items-center gap-4 text-primary">
<MdNotifications className="hover:text-primary-container transition-all duration-200 cursor-pointer" />
<MdHelpOutline className="hover:text-primary-container transition-all duration-200 cursor-pointer" />
<img alt="Librarian profile picture" className="w-8 h-8 rounded-full border border-outline-variant" data-alt="Close-up portrait of a professional woman with a soft smile, well-lit in a modern office setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfCJyRbIHa329USzwIyXRs_8De4DxC__CFcdLKii_yvZ7hq6XWTzxQMwc7ADIIprOMKPiHeBqzVcbKzI7_tqNCRyQznBdmmlB7j_d3VCpckMMyS3LDUvX20r6eJVSaxQePOJOVE0y0TftPCBVDaha5zY93ly5Rfj2iQvp-hvy4PRYYlMjORrJlBw-zKqZv0JoZW2y0RKYRmga1WCLcl7mua40G_gK0A73h92qNLws0-5donCAbRCCSPLvboE_vCrX2zTsRcocF3J2z"/>
</div>
</header>

<div className="hidden md:flex sticky top-0 z-40 items-center justify-end w-full h-20 px-8 bg-surface/80 backdrop-blur-md">
<div className="flex items-center gap-6 text-on-surface-variant">
<MdNotifications className="hover:text-primary transition-all duration-200 cursor-pointer" />
<MdHelpOutline className="hover:text-primary transition-all duration-200 cursor-pointer" />
<div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
<div className="text-right">
<p className="font-label-md text-label-md text-on-surface">Sarah Jenkins</p>
<p className="font-label-sm text-label-sm text-outline">Head Librarian</p>
</div>
<img alt="Librarian profile picture" className="w-10 h-10 rounded-full border border-outline-variant" data-alt="Close-up portrait of a professional woman with a soft smile, well-lit in a modern office setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6fdcQYAqXehqCesgBqhFdBI2RMiOF2fjmdLH2LjhM39iN12VWYscSY490fugjrLrniLDjXsWDsOEbZQNfXBj-I-QgWQNvufaTi9wF_fydQofJZ7SIwN6-BB9uwo5jprgDikTp_b4VR9VGRb-AC5gTbgc2diICVk4U0mkrUPayVk_pqSgXZVrU0gfy3U81_w5rkzz6LYTAKdB-jTvRn8OWodggXhpo3ou5FjqIIfKy4W5MNT8NvtZIuA-mWvROsfI3FEN9XBkdLgnf"/>
</div>
</div>
</div>
<div className="p-container-padding md:p-section-margin max-w-6xl mx-auto">

<div className="mb-8">
<h2 className="font-display-lg text-display-lg text-on-surface">Rapid Circulation</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Scan or enter IDs to process items.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap">

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 bento-shadow flex flex-col h-full border border-outline-variant/30 relative overflow-hidden">

<div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>

<div className="flex bg-surface-container p-1 rounded-lg w-full max-w-sm mb-10 mx-auto relative z-10">
<button className="flex-1 py-2 px-4 rounded-md bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm transition-all duration-200">
                            Issue Item
                        </button>
<button className="flex-1 py-2 px-4 rounded-md text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all duration-200">
                            Return Item
                        </button>
</div>

<div className="space-y-6 flex-grow relative z-10">
<div className="relative group">
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 pl-1" htmlFor="patron-id">Patron ID</label>
<div className="relative flex items-center">
<MdBadge className="absolute left-4 text-outline group-focus-within:text-primary transition-colors" />
<input autoFocus={true} className="w-full bg-surface-container-low border-0 text-on-surface font-body-lg text-body-lg rounded-lg pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="patron-id" placeholder="Scan or type ID..." type="text"/>
</div>
</div>
<div className="relative group">
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 pl-1" htmlFor="book-id">Book ID</label>
<div className="relative flex items-center">
<MdBook className="absolute left-4 text-outline group-focus-within:text-primary transition-colors" />
<input className="w-full bg-surface-container-low border-0 text-on-surface font-body-lg text-body-lg rounded-lg pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="book-id" placeholder="Scan barcode..." type="text"/>
</div>
</div>
</div>

<div className="mt-8 pt-6 border-t border-surface-variant relative z-10 flex justify-end gap-4">
<button className="px-6 py-3 rounded-lg border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                            Clear
                        </button>
<button className="px-8 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-on-primary-fixed-variant shadow-sm transition-colors flex items-center gap-2">
                            Process Issue
                            <MdArrowForward className="text-sm" />
</button>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-card-gap">

<div className="bg-surface-container-lowest rounded-xl p-6 bento-shadow border border-secondary-container bg-gradient-to-br from-surface-container-lowest to-secondary-container/10">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
<MdCheckCircle className="" />
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Success</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Book Checked Out Successfully</p>
<div className="mt-4 p-3 bg-surface-container rounded-lg">
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Item Details</p>
<p className="font-label-md text-label-md text-on-surface truncate">The Martian - Weir, Andy</p>
<p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Due: Oct 24, 2023</p>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-2 gap-card-gap flex-grow">
<div className="bg-surface-container-lowest rounded-xl p-5 bento-shadow border border-outline-variant/30 flex flex-col justify-center">
<MdSwapHoriz className="text-outline mb-2" />
<p className="font-display-lg text-headline-md text-on-surface">142</p>
<p className="font-label-sm text-label-sm text-outline mt-1">Today's Issues</p>
</div>
<div className="bg-surface-container-lowest rounded-xl p-5 bento-shadow border border-outline-variant/30 flex flex-col justify-center">
<MdKeyboardReturn className="text-outline mb-2" />
<p className="font-display-lg text-headline-md text-on-surface">89</p>
<p className="font-label-sm text-label-sm text-outline mt-1">Today's Returns</p>
</div>
</div>
</div>

<div className="lg:col-span-12 bg-surface-container-lowest rounded-xl p-6 bento-shadow border border-outline-variant/30 mt-4">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Activity</h3>
<button className="text-primary font-label-md text-label-md hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-surface-variant">
<th className="py-3 px-4 font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">Time</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">Action</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">Patron</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">Item</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider text-right">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant">10:42 AM</td>
<td className="py-4 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm">
<MdArrowOutward className="text-[14px]" /> Issue
                                        </span>
</td>
<td className="py-4 px-4 font-label-md text-label-md text-on-surface">P-8924 (Doe, J.)</td>
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant truncate max-w-[200px]">The Martian</td>
<td className="py-4 px-4 text-right">
<span className="text-secondary font-label-sm text-label-sm">Success</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant">10:38 AM</td>
<td className="py-4 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">
<MdSubdirectoryArrowLeft className="text-[14px]" /> Return
                                        </span>
</td>
<td className="py-4 px-4 font-label-md text-label-md text-on-surface">P-1142 (Smith, A.)</td>
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant truncate max-w-[200px]">Calculus Early Transcendentals</td>
<td className="py-4 px-4 text-right">
<span className="text-secondary font-label-sm text-label-sm">Success</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant">10:15 AM</td>
<td className="py-4 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm">
<MdArrowOutward className="text-[14px]" /> Issue
                                        </span>
</td>
<td className="py-4 px-4 font-label-md text-label-md text-on-surface">P-9981 (Lee, K.)</td>
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant truncate max-w-[200px]">Design of Everyday Things</td>
<td className="py-4 px-4 text-right">
<span className="text-error font-label-sm text-label-sm">Failed - Fine Due</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant">09:55 AM</td>
<td className="py-4 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">
<MdSubdirectoryArrowLeft className="text-[14px]" /> Return
                                        </span>
</td>
<td className="py-4 px-4 font-label-md text-label-md text-on-surface">P-3321 (Garcia, M.)</td>
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant truncate max-w-[200px]">Introduction to Algorithms</td>
<td className="py-4 px-4 text-right">
<span className="text-secondary font-label-sm text-label-sm">Success</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant">09:42 AM</td>
<td className="py-4 px-4">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm">
<MdArrowOutward className="text-[14px]" /> Issue
                                        </span>
</td>
<td className="py-4 px-4 font-label-md text-label-md text-on-surface">P-5541 (Chen, W.)</td>
<td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant truncate max-w-[200px]">Clean Code</td>
<td className="py-4 px-4 text-right">
<span className="text-secondary font-label-sm text-label-sm">Success</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>

    </div>
  );
}
