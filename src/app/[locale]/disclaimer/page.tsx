export const metadata = { title: 'Disclaimer | EmojiDict' };

export default function DisclaimerPage() {
  return (
    <div className='max-w-3xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-slate-900 mb-6'>Disclaimer</h1>
      <p className='text-slate-600 mb-4'>Last updated: 2026-06-26</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>1. Educational Purpose Only</h2>
      <p className='text-slate-600 mb-4'>All emoji meanings, descriptions, and interpretations provided on EmojiDict are for educational and informational purposes only. Emoji meanings can vary across cultures, contexts, and individuals. Our definitions represent common usage patterns but are not definitive or authoritative.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>2. Not Affiliated with Unicode</h2>
      <p className='text-slate-600 mb-4'>EmojiDict is an independent project and is not affiliated with, endorsed by, or sponsored by the Unicode Consortium, Apple, Google, Microsoft, or any other organization. Emoji names and data are derived from the Unicode CLDR but interpreted and presented by EmojiDict.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>3. Emoji Rendering Differences</h2>
      <p className='text-slate-600 mb-4'>Emoji may appear differently on various devices and platforms (Apple, Google, Samsung, Microsoft, etc.). EmojiDict uses Twemoji (Twitter/X emoji set) for consistency. Your device may render the same emoji differently.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>4. Accuracy of Information</h2>
      <p className='text-slate-600 mb-4'>While we strive for accuracy, we make no representations or warranties about the completeness, accuracy, reliability, or timeliness of any information on EmojiDict. Emoji meanings evolve over time and may change with cultural shifts.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>5. External Links</h2>
      <p className='text-slate-600 mb-4'>EmojiDict may contain links to external websites. We are not responsible for the content, accuracy, or opinions expressed on any external sites.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>6. No Professional Advice</h2>
      <p className='text-slate-600 mb-4'>Content on EmojiDict is not intended as professional advice of any kind, including but not limited to linguistic, cultural, or communication advice.</p>

      <h2 className='text-xl font-bold text-slate-900 mt-6 mb-2'>7. Limitation of Liability</h2>
      <p className='text-slate-600 mb-4'>In no event shall EmojiDict be liable for any loss or damage arising from the use of information on this website.</p>
    </div>
  );
}
