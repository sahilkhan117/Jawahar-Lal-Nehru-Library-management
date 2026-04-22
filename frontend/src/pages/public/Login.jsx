import React from 'react';
import { MdAutoStories, MdSpeed, MdVerifiedUser, MdAccountBalance, MdBadge, MdLock } from 'react-icons/md';

export default function Login() {
  return (
    <div className="space-y-card-gap">
      
<div className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap max-w-5xl w-full">

<div className="hidden lg:flex lg:col-span-7 flex-col gap-card-gap">
<div className="bg-surface-container-lowest bento-shadow rounded-bento p-8 flex-grow relative overflow-hidden">
<div className="relative z-10">
<h1 className="font-display-lg text-on-surface mb-4">The Gateway to Knowledge.</h1>
<p className="font-body-lg text-on-surface-variant max-w-md">Access over 4 million digital volumes, academic journals, and specialized research databases.</p>
</div>
<div className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-10">
<MdAutoStories className="text-[200px]" />
</div>
</div>
<div className="grid grid-cols-2 gap-card-gap">
<div className="bg-primary-container text-on-primary-container p-6 rounded-bento bento-shadow">
<MdSpeed className="mb-2" />
<h3 className="font-headline-sm text-sm">Fast Access</h3>
<p className="text-xs opacity-80">One-click SSO for alumni and faculty</p>
</div>
<div className="bg-secondary-container text-on-secondary-container p-6 rounded-bento bento-shadow">
<MdVerifiedUser className="mb-2" />
<h3 className="font-headline-sm text-sm">Secure Portal</h3>
<p className="text-xs opacity-80">Encrypted institutional gateway</p>
</div>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest bento-shadow rounded-bento p-8 md:p-10 flex flex-col justify-center">
<div className="mb-8 text-center lg:text-left">
<div className="inline-flex items-center justify-center p-3 bg-primary-container/10 rounded-xl mb-4 lg:hidden">
<MdAccountBalance className="text-primary text-3xl" />
</div>
<h2 className="font-headline-md text-on-surface">Member Login</h2>
<p className="font-body-md text-on-surface-variant mt-2">Enter your institutional credentials</p>
</div>
<form className="space-y-6">
<div>
<label className="block font-label-md text-on-surface mb-2" htmlFor="enrollment_id">Enrollment ID</label>
<div className="relative">
<MdBadge className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl" />
<input className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md placeholder:text-outline/50" id="enrollment_id" name="enrollment_id" placeholder="e.g. UN-123456" type="text"/>
</div>
</div>
<div>
<div className="flex justify-between items-center mb-2">
<label className="block font-label-md text-on-surface" htmlFor="password">Password</label>
<a className="font-label-sm text-outline hover:text-primary transition-colors" href="#">Forgot Password?</a>
</div>
<div className="relative">
<MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl" />
<input className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md placeholder:text-outline/50" id="password" name="password" placeholder="••••••••" type="password"/>
</div>
</div>
<div className="flex items-center gap-2 py-2">
<input className="w-4 h-4 rounded border-outline text-primary focus:ring-primary" id="remember" type="checkbox"/>
<label className="font-label-md text-on-surface-variant cursor-pointer" htmlFor="remember">Remember device</label>
</div>
<button className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-sm text-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20" type="submit">
                        Sign In to Portal
                    </button>
</form>
<div className="mt-10 pt-8 border-t border-surface-container-highest">
<p className="text-center font-label-sm text-on-surface-variant">
                        Trouble logging in? <a className="text-primary font-bold hover:underline" href="#">Contact Support</a>
</p>
</div>
</div>
</div>

    </div>
  );
}
