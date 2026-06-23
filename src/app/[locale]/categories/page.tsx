import { categories, categorySlugs, getCategoryCount, twemojiUrl, emojis } from '@/data/emojis';
import Link from 'next/link';
import { Smile, Cat, Apple, Trophy, Plane, Lightbulb, Heart, Flag } from 'lucide-react';
const icons: Record<string, any> = { 'Smileys & People': Smile, 'Animals & Nature': Cat, 'Food & Drink': Apple, 'Activities': Trophy, 'Travel & Places': Plane, 'Objects': Lightbulb, 'Symbols': Heart, 'Flags': Flag };

export const metadata = { title: 'All Emoji Categories | EmojiDict', description: 'Browse all emoji categories.' };

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Emoji Categories</h1>
      <p className="text-slate-600 mb-8">Browse 600+ emojis by category.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(cat => {
          const Icon = icons[cat] || Smile;
          const sample = emojis.filter(e => e.category === cat).slice(0, 6);
          return (
            <Link key={cat} href={`/en/category/${categorySlugs[cat]}`} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><Icon className="w-6 h-6 text-amber-500" /><span className="font-bold text-slate-800">{cat}</span></div>
                <span className="text-xs text-slate-500">{getCategoryCount(cat)}</span>
              </div>
              <div className="flex gap-1">{sample.map(e => <img key={e.codepoint} src={twemojiUrl(e.codepoint)} alt={e.name} width="28" height="28" loading="lazy" />)}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
