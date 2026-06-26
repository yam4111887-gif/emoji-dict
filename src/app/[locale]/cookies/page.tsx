export const metadata = { title: 'Cookie Policy | EmojiDict' };

export default function CookiesPage() {
  return (
    <div className='max-w-3xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-slate-900 mb-6'>Cookie Policy</h1>
      <p className='text-slate-600 mb-4'>Last updated: 2026-06-26</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>1. What Are Cookies</h2>
      <p className='text-slate-600 mb-4'>Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work efficiently and to provide reporting information.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>2. Cookies We Use</h2>
      <table className='w-full text-sm text-slate-600 mb-4 border-collapse'>
        <thead>
          <tr className='border-b border-slate-200'>
            <th className='text-left py-2 pr-4'>Cookie</th>
            <th className='text-left py-2 pr-4'>Purpose</th>
            <th className='text-left py-2 pr-4'>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-slate-100'>
            <td className='py-2 pr-4'>_ga</td>
            <td className='py-2 pr-4'>Google Analytics — distinguishes unique users</td>
            <td className='py-2 pr-4'>2 years</td>
          </tr>
          <tr className='border-b border-slate-100'>
            <td className='py-2 pr-4'>_ga_*</td>
            <td className='py-2 pr-4'>Google Analytics 4 — session state</td>
            <td className='py-2 pr-4'>2 years</td>
          </tr>
          <tr className='border-b border-slate-100'>
            <td className='py-2 pr-4'>_clck / _clsk</td>
            <td className='py-2 pr-4'>Microsoft Clarity — user behavior analytics</td>
            <td className='py-2 pr-4'>1 day / 1 session</td>
          </tr>
          <tr className='border-b border-slate-100'>
            <td className='py-2 pr-4'>cookie-consent</td>
            <td className='py-2 pr-4'>Stores your cookie preference (accepted/declined)</td>
            <td className='py-2 pr-4'>Indefinite</td>
          </tr>
          <tr>
            <td className='py-2 pr-4'>NEXT_LOCALE</td>
            <td className='py-2 pr-4'>Remembers your language preference</td>
            <td className='py-2 pr-4'>1 year</td>
          </tr>
        </tbody>
      </table>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>3. Managing Cookies</h2>
      <p className='text-slate-600 mb-4'>When you first visit EmojiDict, a cookie consent banner appears. You can choose to accept or decline analytics cookies. Your preference is stored in the <code className='bg-slate-100 px-1 rounded'>cookie-consent</code> cookie.</p>
      <p className='text-slate-600 mb-4'>You can also manage cookies through your browser settings:</p>
      <ul className='text-slate-600 mb-4 list-disc pl-6 space-y-1'>
        <li><strong>Chrome</strong>: Settings → Privacy and security → Cookies</li>
        <li><strong>Safari</strong>: Preferences → Privacy → Cookies</li>
        <li><strong>Firefox</strong>: Settings → Privacy & Security → Cookies</li>
        <li><strong>Edge</strong>: Settings → Cookies and site permissions</li>
      </ul>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>4. Third-Party Cookies</h2>
      <p className='text-slate-600 mb-4'>Google Analytics and Microsoft Clarity may set their own cookies as listed above. These are governed by their respective privacy policies.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>5. Updates to This Policy</h2>
      <p className='text-slate-600 mb-4'>We may update this Cookie Policy as our use of cookies changes. Any updates will be reflected on this page.</p>
    </div>
  );
}
