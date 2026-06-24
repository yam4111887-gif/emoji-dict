'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem('cookie-consent')) {
        setTimeout(() => setShow(true), 1000);
      }
    } catch {}
  }, []);
  const accept = () => {
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch {}
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
    }
    setShow(false);
  };
  const decline = () => { try { localStorage.setItem('cookie-consent', 'declined'); } catch {}; setShow(false); };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="mx-auto max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-600">We use cookies for analytics. By clicking &quot;Accept&quot;, you agree to our use of cookies. <Link href="/en/cookies" className="text-amber-600 hover:underline">Cookie Policy</Link></p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={decline} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100">Decline</button>
            <button onClick={accept} className="px-4 py-2 text-sm text-white bg-amber-500 hover:bg-amber-600 rounded-lg">Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
}
