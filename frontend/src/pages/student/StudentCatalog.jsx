import React from 'react';
import { MdArrowForward, MdDataUsage, MdTrendingUp, MdPsychology, MdGavel, MdTerminal, MdTrendingFlat, MdFilterList, MdSort, MdHourglassEmpty } from 'react-icons/md';

export default function StudentCatalog() {
  return (
    <div className="space-y-card-gap">
      
<section>
<div className="flex items-end justify-between mb-card-gap">
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight mb-1">Trending by Domain</h2>
<p className="font-label-md text-label-md text-on-surface-variant">High-demand resources across academic disciplines</p>
</div>
<button className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1">
                    View Analytics
                    <MdArrowForward className="text-[16px]" />
</button>
</div>
<div className="flex overflow-x-auto hide-scrollbar gap-gutter pb-4 -mx-container-padding px-container-padding">
<div className="min-w-[280px] bg-surface-container-lowest rounded-xl p-5 fintech-shadow border border-slate-100 flex flex-col justify-between shrink-0">
<div>
<div className="flex items-center justify-between mb-4">
<div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
<MdDataUsage className="" />
</div>
<span className="bg-secondary/10 text-on-secondary-container px-2 py-1 rounded-DEFAULT font-label-sm text-label-sm flex items-center gap-1">
<MdTrendingUp className="text-[14px]" /> +14%
                            </span>
</div>
<h3 className="font-headline-sm text-[20px] font-semibold text-on-surface mb-1">Quantitative Finance</h3>
<p className="font-label-md text-label-md text-on-surface-variant">42 Active Borrowers</p>
</div>
</div>
<div className="min-w-[280px] bg-surface-container-lowest rounded-xl p-5 fintech-shadow border border-slate-100 flex flex-col justify-between shrink-0">
<div>
<div className="flex items-center justify-between mb-4">
<div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
<MdPsychology className="" />
</div>
<span className="bg-secondary/10 text-on-secondary-container px-2 py-1 rounded-DEFAULT font-label-sm text-label-sm flex items-center gap-1">
<MdTrendingUp className="text-[14px]" /> +8%
                            </span>
</div>
<h3 className="font-headline-sm text-[20px] font-semibold text-on-surface mb-1">Behavioral Economics</h3>
<p className="font-label-md text-label-md text-on-surface-variant">28 Active Borrowers</p>
</div>
</div>
<div className="min-w-[280px] bg-surface-container-lowest rounded-xl p-5 fintech-shadow border border-slate-100 flex flex-col justify-between shrink-0">
<div>
<div className="flex items-center justify-between mb-4">
<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
<MdGavel className="" />
</div>
<span className="bg-secondary/10 text-on-secondary-container px-2 py-1 rounded-DEFAULT font-label-sm text-label-sm flex items-center gap-1">
<MdTrendingUp className="text-[14px]" /> +22%
                            </span>
</div>
<h3 className="font-headline-sm text-[20px] font-semibold text-on-surface mb-1">Corporate Law</h3>
<p className="font-label-md text-label-md text-on-surface-variant">65 Active Borrowers</p>
</div>
</div>
<div className="min-w-[280px] bg-surface-container-lowest rounded-xl p-5 fintech-shadow border border-slate-100 flex flex-col justify-between shrink-0">
<div>
<div className="flex items-center justify-between mb-4">
<div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
<MdTerminal className="" />
</div>
<span className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded-DEFAULT font-label-sm text-label-sm flex items-center gap-1">
<MdTrendingFlat className="text-[14px]" /> 0%
                            </span>
</div>
<h3 className="font-headline-sm text-[20px] font-semibold text-on-surface mb-1">Machine Learning</h3>
<p className="font-label-md text-label-md text-on-surface-variant">89 Active Borrowers</p>
</div>
</div>
</div>
</section>
<section>
<div className="flex items-center justify-between mb-6">
<h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Catalog Grid</h2>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-DEFAULT font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors">
<MdFilterList className="text-[18px]" /> Filter
                    </button>
<button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-DEFAULT font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors">
<MdSort className="text-[18px]" /> Sort
                    </button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
<div className="bg-surface-container-lowest rounded-xl p-5 fintech-shadow fintech-shadow-hover transition-shadow duration-300 border border-slate-50 flex flex-col h-full">
<div className="h-48 w-full bg-surface-variant rounded-lg mb-4 overflow-hidden relative">
<img alt="Book Cover Placeholder" className="w-full h-full object-cover" data-alt="Minimalist abstract geometric book cover design in deep navy and gold on a light surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwc9Jd_AqOHzQ6EWpharhLxQY6phAfST8tomlQfZlI3PaZXVmBnKn_PpB5aWRHY-3OsrJV84-_M5uFv0rfOFbLdyJsHM0EVryonTIYEONGa6ImjuzY0mqfx27ZLXUgnzEZkW7Fy0layTstmRpDxjQGHuTN7_uCxwMkIIDJQpjxnh4EgNtl0P5e9iVB6iVTiSRhEBDhkOSmpuY-Ow8NlxMxyxfu9-1wzcJbjNTIiZaFy23rn7Yrci3eVRQgtvRV-lH6UFmZrCLmZdlk"/>
<div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-DEFAULT font-label-sm text-label-sm text-error font-bold flex items-center gap-1 shadow-sm">
<MdHourglassEmpty className="text-[14px]" /> Waitlist
                        </div>
</div>
<div className="flex flex-col flex-1">
<h3 className="font-label-md text-label-md text-on-surface font-semibold leading-tight mb-1">Principles of Corporate Finance</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-3">Richard A. Brealey, Stewart C. Myers</p>
<div className="mt-auto pt-4 border-t border-surface-variant">
<div className="flex items-center justify-between mb-3">
<span className="font-label-sm text-label-sm text-on-surface-variant">Status:</span>
<span className="font-label-sm text-label-sm font-semibold text-error">Checked Out</span>
</div>
<button className="w-full py-2 px-4 border border-outline text-primary font-label-md text-label-md rounded-DEFAULT hover:bg-surface-container transition-colors bg-transparent">
                                Join Waitlist
                            </button>
</div>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-5 fintech-shadow fintech-shadow-hover transition-shadow duration-300 border border-slate-50 flex flex-col h-full">
<div className="h-48 w-full bg-surface-variant rounded-lg mb-4 overflow-hidden relative">
<img alt="Book Cover Placeholder" className="w-full h-full object-cover" data-alt="Modern minimalist book cover featuring subtle topographical lines in muted green and grey" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZtzkFRn1xl1x_VhkXO79HiHkcfxuNx3Z_Hzh-cefLmLDhkLNrYBKe-CDf6jjYX0AQQhvu1O0Wy1xu2F-M9UelswIcm1bTMGleZYisI6A2BX19YtItQYlykabc_bfFW-UlB_1szCbp2upqzAYlRK0Oeo6H926HZEZCCHdswFDdSCDIgcZjUPAdc7zstkZwSmTSm2x39QnjFk0ZigYlfYcImwHFwkoVFtxojDSvJyru9hVyYWWmy-2qc1c6xvL2H6xspLL-NJJ--Cg5"/>
</div>
<div className="flex flex-col flex-1">
<h3 className="font-label-md text-label-md text-on-surface font-semibold leading-tight mb-1">Statistical Inference</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-3">George Casella, Roger L. Berger</p>
<div className="mt-auto pt-4 border-t border-surface-variant">
<div className="flex items-center justify-between mb-3">
<span className="font-label-sm text-label-sm text-on-surface-variant">Status:</span>
<span className="font-label-sm text-label-sm font-semibold text-secondary">Available</span>
</div>
<button className="w-full py-2 px-4 bg-primary text-on-primary font-label-md text-label-md rounded-DEFAULT hover:bg-primary/90 transition-colors">
                                Borrow Title
                            </button>
</div>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-5 fintech-shadow fintech-shadow-hover transition-shadow duration-300 border border-slate-50 flex flex-col h-full">
<div className="h-48 w-full bg-surface-variant rounded-lg mb-4 overflow-hidden relative">
<img alt="Book Cover Placeholder" className="w-full h-full object-cover" data-alt="Classic textbook spine showing title text against a dark leather-bound texture with soft library lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG6ipAc03N-kiOSvM8ffOq6LKErmfpFO6Qe-oGWeFSZNceTdF-uX_zNcTLhOHbraAssitis4mAE140wdvmcWXYGr8bY7PPhahTcu9raMBg_TO0uGzN9vPbSuDd0l3S_o4Y6-ZFoJ18ngbvgBN7rHAoIqu4_3cNnmCwosAY1vpcW7AVNBaVdQlR6dI_CAGGBh0yb8Z-m-oVbJi7qXoO4utPSUzoCGj7a_S-DaAttc8d7hJKByHmEyvyC5fV5fktxX2FHMKgks-lRpcb"/>
<div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-DEFAULT font-label-sm text-label-sm text-error font-bold flex items-center gap-1 shadow-sm">
<MdHourglassEmpty className="text-[14px]" /> Waitlist
                        </div>
</div>
<div className="flex flex-col flex-1">
<h3 className="font-label-md text-label-md text-on-surface font-semibold leading-tight mb-1">Microeconomic Theory</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-3">Andreu Mas-Colell, Michael D. Whinston</p>
<div className="mt-auto pt-4 border-t border-surface-variant">
<div className="flex items-center justify-between mb-3">
<span className="font-label-sm text-label-sm text-on-surface-variant">Status:</span>
<span className="font-label-sm text-label-sm font-semibold text-error">Checked Out</span>
</div>
<button className="w-full py-2 px-4 border border-outline text-primary font-label-md text-label-md rounded-DEFAULT hover:bg-surface-container transition-colors bg-transparent">
                                Join Waitlist
                            </button>
</div>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-5 fintech-shadow fintech-shadow-hover transition-shadow duration-300 border border-slate-50 flex flex-col h-full">
<div className="h-48 w-full bg-surface-variant rounded-lg mb-4 overflow-hidden relative">
<img alt="Book Cover Placeholder" className="w-full h-full object-cover" data-alt="Clean academic journal cover with stark white background and sharp black typographic layout" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6OF8ZYYRx9hgR7tbM1u5W6eHGoD-Z4Jl9QQDc_tBHhd7uACYnoY8Q0tpO19POqo3XTJ9d27PvvcjgLLSXAAGd6PGGJgCh0NI5HA4vEKJa2z55e87tv2W2ccddmaDtckmqkAcwbXvD2tDPXaIsqkLD-2Rdves_BOMW5ulVP9xcQI8maRA89qWZ246-V475S2Qu3hyVhFxdKk7lV8fynianpjpTULEa3fnIOhD5CFb3HNc51Xy2v7PdPYGaZkSlcXO54L8ZkugtBzMr"/>
</div>
<div className="flex flex-col flex-1">
<h3 className="font-label-md text-label-md text-on-surface font-semibold leading-tight mb-1">Options, Futures, and Other Derivatives</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-3">John C. Hull</p>
<div className="mt-auto pt-4 border-t border-surface-variant">
<div className="flex items-center justify-between mb-3">
<span className="font-label-sm text-label-sm text-on-surface-variant">Status:</span>
<span className="font-label-sm text-label-sm font-semibold text-secondary">Available</span>
</div>
<button className="w-full py-2 px-4 bg-primary text-on-primary font-label-md text-label-md rounded-DEFAULT hover:bg-primary/90 transition-colors">
                                Borrow Title
                            </button>
</div>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-5 fintech-shadow fintech-shadow-hover transition-shadow duration-300 border border-slate-50 flex flex-col h-full">
<div className="h-48 w-full bg-surface-variant rounded-lg mb-4 overflow-hidden relative">
<img alt="Book Cover Placeholder" className="w-full h-full object-cover" data-alt="Stack of crisp modern hardcover books with colorful spines sitting on a polished oak desk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3r0cEga83sTAo0bBXocqU_DJ6gq3OAYaATWWmtUVGpoSEtgXmfmhFs5MbXXrme8sAtON3_ZoEnWlWI6LnNlb46_nfOOiiYXeK8dDPE6ytJlrVKSgVWmtZWYO3Adti6FRnGnSlT5-bNSORo5wpQLXxILUuvC86RO-bqDlLFqcaQIk09vCrQzfQSAfhfHORvsEP4ZaHtYVvbPLStz8IG9oMs-AGFtP9TLxRjQMIaxHCyPeyNboXNOuNkqdF7b_yydHRdJXSSJEfd-Sm"/>
<div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-DEFAULT font-label-sm text-label-sm text-error font-bold flex items-center gap-1 shadow-sm">
<MdHourglassEmpty className="text-[14px]" /> Waitlist
                        </div>
</div>
<div className="flex flex-col flex-1">
<h3 className="font-label-md text-label-md text-on-surface font-semibold leading-tight mb-1">Deep Learning</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-3">Ian Goodfellow, Yoshua Bengio</p>
<div className="mt-auto pt-4 border-t border-surface-variant">
<div className="flex items-center justify-between mb-3">
<span className="font-label-sm text-label-sm text-on-surface-variant">Status:</span>
<span className="font-label-sm text-label-sm font-semibold text-error">Checked Out</span>
</div>
<button className="w-full py-2 px-4 border border-outline text-primary font-label-md text-label-md rounded-DEFAULT hover:bg-surface-container transition-colors bg-transparent">
                                Join Waitlist
                            </button>
</div>
</div>
</div>
</div>
</section>

    </div>
  );
}
