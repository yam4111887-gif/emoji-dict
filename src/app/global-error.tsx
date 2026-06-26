'use client';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h1>
          <p className="text-slate-500 mb-4">An unexpected error occurred.</p>
          <button onClick={reset} className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600">Try again</button>
        </div>
      </body>
    </html>
  );
}
