export const metadata = { title: 'Terms of Service | EmojiDict' };

export default function TermsPage() {
  return (
    <div className='max-w-3xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-slate-900 mb-6'>Terms of Service</h1>
      <p className='text-slate-600 mb-4'>Last updated: 2026-06-26</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>1. Acceptance of Terms</h2>
      <p className='text-slate-600 mb-4'>By accessing and using EmojiDict (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>2. Service Description</h2>
      <p className='text-slate-600 mb-4'>EmojiDict is a free online emoji dictionary providing meanings, definitions, keywords, Unicode codepoints, and usage information for emojis. All content is provided for educational and informational purposes.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>3. Intellectual Property</h2>
      <ul className='text-slate-600 mb-4 list-disc pl-6 space-y-1'>
        <li>Emoji meanings, descriptions, and blog content are original works created by EmojiDict.</li>
        <li>Emoji images are from <strong>Twemoji</strong> (Copyright Twitter/X, MIT License). See <a href='https://github.com/twitter/twemoji/blob/master/LICENSE' className='text-amber-600 hover:underline' rel='noopener noreferrer'>Twemoji License</a>.</li>
        <li>Emoji characters themselves are part of the Unicode Standard and are not owned by EmojiDict.</li>
        <li>Emoji names and keywords are based on Unicode CLDR data (Unicode, Inc.).</li>
      </ul>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>4. Permitted Use</h2>
      <p className='text-slate-600 mb-4'>You may freely browse, search, and use EmojiDict for personal, educational, or commercial reference. You may link to any EmojiDict page. You may copy emoji characters using the copy button — emoji characters are free to use.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>5. Prohibited Use</h2>
      <ul className='text-slate-600 mb-4 list-disc pl-6 space-y-1'>
        <li>Do not scrape or bulk-download emoji content for republication.</li>
        <li>Do not use the Service for any illegal or harmful purpose.</li>
        <li>Do not attempt to disrupt or overload the Service.</li>
      </ul>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>6. Disclaimer of Warranties</h2>
      <p className='text-slate-600 mb-4'>EmojiDict is provided "as is" without warranties of any kind. Emoji meanings are interpretive and for educational purposes only. We do not guarantee the accuracy, completeness, or reliability of any content.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>7. Limitation of Liability</h2>
      <p className='text-slate-600 mb-4'>EmojiDict shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of the Service.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>8. Third-Party Links</h2>
      <p className='text-slate-600 mb-4'>The Service may contain links to third-party websites. We are not responsible for the content or practices of any third-party sites.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>9. Changes to Terms</h2>
      <p className='text-slate-600 mb-4'>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
    </div>
  );
}
