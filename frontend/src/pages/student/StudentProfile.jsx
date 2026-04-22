import React from 'react';
import { MdVerified, MdBook, MdPayments } from 'react-icons/md';

export default function StudentProfile() {
  return (
    <div className="space-y-card-gap">
      

<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface mb-1">Student Overview</h2>
<p className="font-body-md text-body-md text-outline">Welcome back. Here is your current library standing.</p>
</div>
<div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
<MdVerified className="text-secondary text-sm" />
<span className="font-label-md text-label-md text-secondary font-medium tracking-wide">No-Dues Status: Verified</span>
</div>
</div>

<div className="grid grid-cols-12 gap-card-gap">

<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-container-padding flex flex-col justify-between">
<div className="flex flex-col h-full">
<div className="mb-6">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Hello, Alex</h3>
<p className="font-body-md text-body-md text-outline mt-1">Your reading journey is on track. You have a few items due soon.</p>
</div>
<div className="flex gap-4 mt-auto">

<div className="flex-1 bg-surface-container-low rounded-lg p-4 border border-surface-variant">
<div className="flex items-center gap-2 mb-2 text-primary">
<MdBook className="" />
<span className="font-label-md text-label-md font-semibold">Active Books</span>
</div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-on-surface">03</span>
<span className="font-body-md text-body-md text-outline">/ 05 limit</span>
</div>
</div>

<div className="flex-1 bg-error-container/30 rounded-lg p-4 border border-error-container">
<div className="flex items-center gap-2 mb-2 text-on-error-container">
<MdPayments className="" />
<span className="font-label-md text-label-md font-semibold">Pending Fines</span>
</div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-on-error-container">$0.00</span>
<span className="font-body-md text-body-md text-outline">All clear</span>
</div>
</div>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-container-padding flex flex-col items-center justify-center relative overflow-hidden">
<div className="absolute top-4 left-4">
<h3 className="font-label-md text-label-md font-semibold text-on-surface">Reading Room</h3>
<p className="font-label-sm text-label-sm text-outline">Seat Availability</p>
</div>
<div className="relative w-40 h-40 mt-8">
<svg className="circular-chart text-primary w-full h-full" viewBox="0 0 36 36">
<path className="circle-bg" d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
<path className="circle stroke-current" d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray="37.5, 100"></path>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-headline-md text-headline-md text-on-surface">45</span>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">/ 120</span>
</div>
</div>
<div className="mt-4 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Moderate Capacity</span>
</div>
</div>

<div className="col-span-12 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-container-padding">
<div className="flex items-center justify-between mb-6">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Library Attendance</h3>
<p className="font-body-md text-body-md text-outline">Your physical presence in the reading rooms over the last 90 days.</p>
</div>
<div className="flex items-center gap-2 font-label-sm text-label-sm text-outline">
<span>Less</span>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<span>More</span>
</div>
</div>
<div className="overflow-x-auto pb-2">
<div className="heatmap-grid min-w-[600px]">


<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>

<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>

<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
<div className="w-3 h-3 rounded-sm bg-primary/30"></div>
<div className="w-3 h-3 rounded-sm bg-primary"></div>
<div className="w-3 h-3 rounded-sm bg-primary/60"></div>
<div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
</div>
</div>
</div>

<div className="col-span-12 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-container-padding">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Trending in Your Department</h3>
<button className="text-primary hover:text-primary-container font-label-md text-label-md font-medium transition-colors">View Catalog →</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<div className="group border border-surface-variant rounded-lg p-4 hover:shadow-md transition-shadow bg-background flex flex-col h-full">
<div className="aspect-[2/3] w-full mb-4 rounded bg-surface-variant overflow-hidden relative shadow-sm">
<img alt="The Design of Everyday Things" className="w-full h-full object-cover" data-alt="Cover of the book The Design of Everyday Things with a minimalist red and white typographic design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUGEbvprjfegXbgTnufTNZSybNfIXzKpc4UL6O572amyHNa8Rd9GtqjSLXaYflWXwz4bDxMPAgJnh9YDRravtb_2IOvdC5Lq6olAiNrSTc4ADiRcOA7wA8LvSiWsc5QkoCg2oktLsyy8ILqR4A6CXUqrsmUQ7fRARzK0_IcKM1Z5VY5LwjaqldxugYotjNB1Q39spTvTB9A3e_JUB02xsvQhiChnueym6Kb8yExFiwlK-ibbF0HaI5KY0eXZiOrhDHSUYFmR6cIghm"/>
</div>
<h4 className="font-label-md text-label-md font-bold text-on-surface line-clamp-1">The Design of Everyday Things</h4>
<p className="font-label-sm text-label-sm text-outline mb-4">Don Norman</p>
<button className="mt-auto w-full py-2 px-4 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md transition-colors border border-primary/20 hover:border-primary">
                            Join Waitlist
                        </button>
</div>

<div className="group border border-surface-variant rounded-lg p-4 hover:shadow-md transition-shadow bg-background flex flex-col h-full">
<div className="aspect-[2/3] w-full mb-4 rounded bg-surface-variant overflow-hidden relative shadow-sm">
<img alt="Thinking, Fast and Slow" className="w-full h-full object-cover" data-alt="Cover of the book Thinking Fast and Slow with a bright yellow background and a prominent blue pencil illustration" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh8JmfN1m0h0tkOLRA9SP_gPdgMh0O1FlPYUwcsRkF0BrrXqBVpzLljVfFLZWe4zuJ6hAtIT2HvNx9ct6u0PGj-wtKLqtyU6CUSYoQUlXdGeIn4T-oKS-46ntZloTL5hYFpRXEnPTcAMRAkW4pYkyP9PLgMtm7qixWWXHb5HUIyeu5HoF0u20n6YJSplqJLxLYIJyi-1XT5UjQFeYX3-ixcfehcY6QYWvjqCRXBdlWcSnGamP3Ekazwv8jEtNDqtiRbhcqYhbdag8I"/>
</div>
<h4 className="font-label-md text-label-md font-bold text-on-surface line-clamp-1">Thinking, Fast and Slow</h4>
<p className="font-label-sm text-label-sm text-outline mb-4">Daniel Kahneman</p>
<button className="mt-auto w-full py-2 px-4 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md transition-colors border border-primary/20 hover:border-primary">
                            Join Waitlist
                        </button>
</div>

<div className="group border border-surface-variant rounded-lg p-4 hover:shadow-md transition-shadow bg-background flex flex-col h-full">
<div className="aspect-[2/3] w-full mb-4 rounded bg-surface-variant overflow-hidden relative shadow-sm">
<img alt="Principles of Economics" className="w-full h-full object-cover" data-alt="Thick academic textbook cover for Principles of Economics with geometric shapes in navy and gold" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Jqo1Ru4XZ9i_05DUFaFdLC9LFMc8FdqnG6R-NVOUNShIlNKw-98dOBo0kJXV4QvCpDCgyBWkrlv4OkTiLcBr8qoV27AhZQiNEqQwNlZ3ZIYDt1qSwrDrJSiFzxgjTtphfNa69qUQTIUoZiWSaCEUUDmNb13MeepDfljFwHdMI2g_EdnQ4ugixNtWIqvMd_62xT30qTdk586PrmPjxGNB2KAw6qtjM5q0O4rKTbVh0dv-Fu3i2pxnCXAHKiebut2hKwLjLqvTh01t"/>
</div>
<h4 className="font-label-md text-label-md font-bold text-on-surface line-clamp-1">Principles of Economics</h4>
<p className="font-label-sm text-label-sm text-outline mb-4">N. Gregory Mankiw</p>
<button className="mt-auto w-full py-2 px-4 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md transition-colors border border-primary/20 hover:border-primary">
                            Join Waitlist
                        </button>
</div>

<div className="group border border-surface-variant rounded-lg p-4 hover:shadow-md transition-shadow bg-background flex flex-col h-full">
<div className="aspect-[2/3] w-full mb-4 rounded bg-surface-variant overflow-hidden relative shadow-sm">
<img alt="Clean Code" className="w-full h-full object-cover" data-alt="Cover of the programming book Clean Code with a sleek dark aesthetic and green technical syntax highlighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpLO8o8jtQrQ4CPORPBs0_Ud1Gkq_LPOWVX5p0tejw7B1OoAqN-pD1poG1DFQPo0nlvAnjm613fr4BVMovaV64lvTqgIpiAC_DytClJOMSbI64v1z10p_HZs_-tiUc6b1G5HtSM11vnxaS4bpZEuVDLD16CyQ2vZI8-_WeRncKqF0Wy2xlu8YFpOaIhVe8CulqJe0H38t_QlMlJMHGUwCubCG46cON03uChJrF1kRFkEfQ_OXt6xcOWeN1EdI3PwEGCpbbfp7xcm4i"/>
</div>
<h4 className="font-label-md text-label-md font-bold text-on-surface line-clamp-1">Clean Code</h4>
<p className="font-label-sm text-label-sm text-outline mb-4">Robert C. Martin</p>
<button className="mt-auto w-full py-2 px-4 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md transition-colors border border-primary/20 hover:border-primary">
                            Join Waitlist
                        </button>
</div>
</div>
</div>
</div>

    </div>
  );
}
