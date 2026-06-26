export const metadata = { title: 'Privacy Policy | EmojiDict' };

export default function PrivacyPage() {
  return (
    <div className='max-w-3xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-slate-900 mb-6'>Privacy Policy</h1>
      <p className='text-slate-600 mb-4'>Last updated: 2026-06-26</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>1. Information We Collect</h2>
      <p className='text-slate-600 mb-4'>EmojiDict is a static website that processes all data client-side in your browser. We do not require accounts, logins, or personal information. We do not collect or store any personal data directly.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>2. Analytics</h2>
      <p className='text-slate-600 mb-4'>We use Google Analytics 4 and Microsoft Clarity to understand how visitors use our site. These tools collect anonymous usage data such as page views, session duration, and approximate location (country/city level). Analytics are only loaded after you give consent via our cookie banner.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>3. Cookies</h2>
      <p className='text-slate-600 mb-4'>We use cookies only for analytics purposes. No advertising cookies are used at this time. You can control cookie usage through our consent banner. See our <a href='/en/cookies' className='text-amber-600 hover:underline'>Cookie Policy</a> for details.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>4. Third-Party Services</h2>
      <ul className='text-slate-600 mb-4 list-disc pl-6 space-y-1'>
        <li><strong>Google Analytics</strong> — Web analytics (privacy: <a href='https://policies.google.com/privacy' className='text-amber-600 hover:underline' rel='noopener noreferrer'>Google Privacy Policy</a>)</li>
        <li><strong>Microsoft Clarity</strong> — Heatmaps and session recordings (privacy: <a href='https://privacy.microsoft.com/privacystatement' className='text-amber-600 hover:underline' rel='noopener noreferrer'>Microsoft Privacy Statement</a>)</li>
        <li><strong>jsDelivr CDN</strong> — Emoji images are served from jsDelivr CDN (Twemoji, MIT License)</li>
      </ul>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>5. Data Retention</h2>
      <p className='text-slate-600 mb-4'>We do not retain any personal data. Anonymous analytics data is retained by Google Analytics and Microsoft Clarity according to their respective policies (typically 14-26 months).</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>6. Your Rights (GDPR)</h2>
      <p className='text-slate-600 mb-4'>Under the GDPR, you have the right to access, rectify, erase, or restrict the processing of your personal data. Since we do not collect personal data, these rights are primarily exercised through your cookie consent choices. You can withdraw consent at any time by clearing your browser cookies.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>7. Children&apos;s Privacy</h2>
      <p className='text-slate-600 mb-4'>EmojiDict does not knowingly collect any data from children under 16. The site is suitable for all ages.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>8. Changes to This Policy</h2>
      <p className='text-slate-600 mb-4'>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>9. Contact</h2>
      <p className='text-slate-600 mb-4'>For privacy questions, please reach out via our GitHub repository or social channels.</p>
    </div>
  );
}
