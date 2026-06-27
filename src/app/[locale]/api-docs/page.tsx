import type { Metadata } from 'next';
import { locales, defaultLocale, t } from '@/lib/i18n';
import { siteConfig } from '@/lib/constants';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locales.includes(locale as any) ? locale : defaultLocale) as typeof defaultLocale;
  const title = `Emoji API — ${siteConfig.name}`;
  const description = 'Free Emoji API with JSON responses. Search, filter, and access 1,300+ emojis with names, keywords, and descriptions.';
  const canonical = `${siteConfig.url}/${loc}/api-docs/`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(locales.map(l => [l, `${siteConfig.url}/${l}/api-docs/`])),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}

export default async function ApiDocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      <Navbar locale={locale} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Emoji API</h1>
        <p className="text-slate-600 mb-8">Free, fast, no authentication required. JSON responses.</p>

        <div className="space-y-8">
          {/* Get All Emojis */}
          <section className="bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-mono">GET</span>
              All Emojis
            </h2>
            <code className="block bg-slate-900 text-green-400 rounded-lg p-3 text-sm mb-3 overflow-x-auto">
              GET /api/emojis
            </code>
            <p className="text-slate-600 text-sm mb-3">Returns paginated list of all emojis.</p>
            <div className="text-sm">
              <p className="font-semibold mb-1">Query Parameters:</p>
              <ul className="space-y-1 text-slate-600">
                <li><code className="bg-slate-200 px-1 rounded">search</code> — Search by name, keyword, or description</li>
                <li><code className="bg-slate-200 px-1 rounded">category</code> — Filter by category (e.g., "Animals & Nature")</li>
                <li><code className="bg-slate-200 px-1 rounded">limit</code> — Number of results (default: 50)</li>
                <li><code className="bg-slate-200 px-1 rounded">offset</code> — Pagination offset (default: 0)</li>
              </ul>
            </div>
            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-amber-600 hover:underline">View Response Example</summary>
              <pre className="mt-2 bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto">{`{
  "total": 1366,
  "count": 2,
  "offset": 0,
  "limit": 2,
  "data": [
    {
      "char": "😀",
      "codepoint": "1f600",
      "name": "Grinning Face",
      "category": "Smileys & People",
      "keywords": ["smile", "happy", "joy", "cheerful"],
      "description": "A yellow face with open eyes and a wide, open smile..."
    }
  ]
}`}</pre>
            </details>
          </section>

          {/* Get by Codepoint */}
          <section className="bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-mono">GET</span>
              Emoji by Codepoint
            </h2>
            <code className="block bg-slate-900 text-green-400 rounded-lg p-3 text-sm mb-3 overflow-x-auto">
              GET /api/emojis/&#123;codepoint&#125;
            </code>
            <p className="text-slate-600 text-sm">Returns a single emoji by its Unicode codepoint.</p>
            <pre className="mt-2 bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto">{`GET /api/emojis/1f600

{
  "char": "😀",
  "codepoint": "1f600",
  "name": "Grinning Face",
  "category": "Smileys & People",
  "keywords": ["smile", "happy", "joy", "cheerful"],
  "description": "A yellow face with open eyes and a wide..."
}`}</pre>
          </section>

          {/* Random Emoji */}
          <section className="bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-mono">GET</span>
              Random Emoji
            </h2>
            <code className="block bg-slate-900 text-green-400 rounded-lg p-3 text-sm mb-3 overflow-x-auto">
              GET /api/emojis/random
            </code>
            <p className="text-slate-600 text-sm">Returns a random emoji. Great for "emoji of the day" features.</p>
          </section>

          {/* Rate Limits */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">📋 Usage Guidelines</h2>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>✅ Free to use, no API key required</li>
              <li>✅ No rate limits (please be reasonable)</li>
              <li>✅ JSON responses, CORS enabled</li>
              <li>⚠️ Data is for reference only — always verify with Unicode CLDR for production use</li>
              <li>💡 Tip: Cache responses on your end to improve performance</li>
            </ul>
          </section>

          {/* Code Examples */}
          <section className="bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">💻 Code Examples</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-sm mb-2">JavaScript / Node.js</p>
                <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto">{`const res = await fetch('https://emojidict.com/api/emojis?search=happy&limit=5');
const { data } = await res.json();
console.log(data); // Array of happy emojis`}</pre>
              </div>
              <div>
                <p className="font-semibold text-sm mb-2">Python</p>
                <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto">{`import requests
res = requests.get('https://emojidict.com/api/emojis?category=Animals+%26+Nature&limit=10')
data = res.json()
for emoji in data['data']:
    print(f"{emoji['char']} {emoji['name']}")`}</pre>
              </div>
              <div>
                <p className="font-semibold text-sm mb-2">cURL</p>
                <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto">{`curl https://emojidict.com/api/emojis/random`}</pre>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
