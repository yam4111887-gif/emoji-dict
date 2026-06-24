'use client';

export function AdSlot({ slot = 'default', className = '' }: { slot?: string; className?: string }) {
  // Hidden by default. Set NEXT_PUBLIC_ADSENSE_ID to show real ads.
  // Set NEXT_PUBLIC_AD_DEBUG=true to see placeholder boxes in development.
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const debug = process.env.NEXT_PUBLIC_AD_DEBUG;

  if (!adsenseId && !debug) return null;

  if (debug) {
    return (
      <div className={`border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-lg p-4 text-center ${className}`}>
        <span className="text-xs text-emerald-600 font-medium">Ad Slot: {slot}</span>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins className="adsbygoogle" style={{ display: 'block' }}
        data-ad-client={adsenseId} data-ad-slot={slot}
        data-ad-format="auto" data-full-width-responsive="true" />
    </div>
  );
}
