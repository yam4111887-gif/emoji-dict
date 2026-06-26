'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { locales, type Locale, t } from '@/lib/i18n';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [loc, setLoc] = useState<Locale>('en');

  useEffect(() => {
    const path = window.location.pathname;
    const found = locales.find(l => path.startsWith(`/${l}`));
    if (found) setLoc(found);

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

  const cookieMsg: Record<string, string> = {
    en: 'We use cookies for analytics. By clicking "Accept", you agree to our use of cookies.',
    'zh-TW': '我們使用 Cookie 進行分析。點擊「接受」即表示您同意我們使用 Cookie。',
    es: 'Usamos cookies para análisis. Al hacer clic en "Aceptar", aceptas el uso de cookies.',
    ja: '分析にCookieを使用します。「同意」をクリックすると、Cookieの使用に同意したことになります。',
    de: 'Wir verwenden Cookies für Analysen. Mit Klick auf "Akzeptieren" stimmen Sie der Verwendung zu.',
    fr: 'Nous utilisons des cookies à des fins d\'analyse. En cliquant sur "Accepter", vous acceptez notre utilisation des cookies.',
    pt: 'Usamos cookies para análise. Ao clicar em "Aceitar", concorda com o uso de cookies.',
    ko: '분석을 위해 쿠키를 사용합니다. "수락"을 클릭하면 쿠키 사용에 동의하는 것입니다.',
    it: 'Utilizziamo i cookie per l\'analisi. Cliccando "Accetta", accetti l\'uso dei cookie.',
    hi: 'हम विश्लेषण के लिए कुकीज़ का उपयोग करते हैं। "स्वीकार" पर क्लिक करके, आप कुकीज़ के उपयोग से सहमत होते हैं।',
    ar: 'نستخدم ملفات تعريف الارتباط للتحليل. بالنقر على "قبول"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
    ru: 'Мы используем файлы cookie для аналитики. Нажимая «Принять», вы соглашаетесь с использованием файлов cookie.',
    th: 'เราใช้คุกกี้เพื่อการวิเคราะห์ การคลิก "ยอมรับ" หมายความว่าคุณยอมรับการใช้คุกกี้',
    vi: 'Chúng tôi sử dụng cookie để phân tích. Bằng cách nhấp vào "Chấp nhận", bạn đồng ý với việc sử dụng cookie.',
    id: 'Kami menggunakan cookie untuk analitik. Dengan mengklik "Terima", Anda menyetujui penggunaan cookie kami.',
    tr: 'Analiz için çerez kullanıyoruz. "Kabul Et" tıklayarak çerez kullanımımızı kabul etmiş olursunuz.',
    pl: 'Używamy plików cookie do analizy. Klikając "Akceptuj", zgadzasz się na używanie plików cookie.',
    nl: 'We gebruiken cookies voor analyse. Door op "Accepteren" te klikken, ga je akkoord met ons cookiegebruik.',
    sv: 'Vi använder cookies för analys. Genom att klicka på "Acceptera" godkänner du vår användning av cookies.',
    cs: 'Používáme cookies pro analýzu. Kliknutím na „Přijmout\" souhlasíte s používáním cookies.',
    el: 'Χρησιμοποιούμε cookie για ανάλυση. Κάνοντας κλικ στο "Αποδοχή", αποδέχεστε τη χρήση των cookie.',
    uk: 'Ми використовуємо файли cookie для аналітики. Натиснувши «Прийняти», ви погоджуєтесь з використанням файлів cookie.',
    ro: 'Folosim cookie-uri pentru analiză. Făcând clic pe "Acceptați", accepți utilizarea cookie-urilor.',
    hu: 'Cookie-kat használunk az elemzéshez. Az "Elfogad" gombra kattintva elfogadja a cookie-k használatát.',
    da: 'Vi bruger cookies til analyse. Ved at klikke på "Accepter" accepterer du vores brug af cookies.',
    no: 'Vi bruker informasjonskapsler for analyse. Ved å klikke på "Godta" godtar du bruken av informasjonskapsler.',
    fi: 'Käytämme evästeitä analytiikkaan. Napsauttamalla "Hyväksy" hyväksyt evästeidemme käytön.',
    he: 'אנו משתמשים בעוגיות לצורכי ניתוח. בלחיצה על "קבל" אתה מסכים לשימוש בעוגיות.',
    ms: 'Kami menggunakan cookie untuk analitik. Dengan mengklik "Terima", anda bersetuju dengan penggunaan cookie kami.',
    'pt-BR': 'Usamos cookies para análise. Ao clicar em "Aceitar", você concorda com o uso de cookies.',
  };

  const acceptText: Record<string, string> = {
    en: 'Accept', 'zh-TW': '接受', es: 'Aceptar', ja: '同意', de: 'Akzeptieren', fr: 'Accepter', pt: 'Aceitar', ko: '수락', it: 'Accetta', hi: 'स्वीकार', ar: 'قبول', ru: 'Принять', th: 'ยอมรับ', vi: 'Chấp nhận', id: 'Terima', tr: 'Kabul Et', pl: 'Akceptuj', nl: 'Accepteren', sv: 'Acceptera', cs: 'Přijmout', el: 'Αποδοχή', uk: 'Прийняти', ro: 'Acceptă', hu: 'Elfogad', da: 'Accepter', no: 'Godta', fi: 'Hyväksy', he: 'קבל', ms: 'Terima', 'pt-BR': 'Aceitar',
  };
  const declineText: Record<string, string> = {
    en: 'Decline', 'zh-TW': '拒絕', es: 'Rechazar', ja: '拒否', de: 'Ablehnen', fr: 'Refuser', pt: 'Recusar', ko: '거부', it: 'Rifiuta', hi: 'अस्वीकार', ar: 'رفض', ru: 'Отклонить', th: 'ปฏิเสธ', vi: 'Từ chối', id: 'Tolak', tr: 'Reddet', pl: 'Odrzuć', nl: 'Weigeren', sv: 'Avvisa', cs: 'Odmítnout', el: 'Απόρριψη', uk: 'Відхилити', ro: 'Refuză', hu: 'Elutasít', da: 'Afvis', no: 'Avvis', fi: 'Hylkää', he: 'דחה', ms: 'Tolak', 'pt-BR': 'Recusar',
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="mx-auto max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-600">{cookieMsg[loc] || cookieMsg.en} <Link href={`/${loc}/cookies`} className="text-amber-600 hover:underline">{t(loc, 'nav.cookies')}</Link></p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={decline} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100">{declineText[loc] || declineText.en}</button>
            <button onClick={accept} className="px-4 py-2 text-sm text-white bg-amber-500 hover:bg-amber-600 rounded-lg">{acceptText[loc] || acceptText.en}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
