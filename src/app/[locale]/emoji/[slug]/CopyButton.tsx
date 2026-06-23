'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({ char }: { char: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(char); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={copy} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition">
      {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy {char}</>}
    </button>
  );
}
