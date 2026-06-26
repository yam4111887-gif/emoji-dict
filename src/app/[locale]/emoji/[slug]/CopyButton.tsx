'use client';
import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({ char, locale }: { char: string; locale?: string }) {
  const [copied, setCopied] = useState(false);
  
  const copy = useCallback(() => {
    navigator.clipboard.writeText(char);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [char]);

  const copyText = locale === 'en' ? 'Copy' : locale === 'zh-TW' ? '複製' : locale === 'es' ? 'Copiar' : locale === 'ja' ? 'コピー' : locale === 'de' ? 'Kopieren' : locale === 'fr' ? 'Copier' : locale === 'pt' ? 'Copiar' : locale === 'ko' ? '복사' : locale === 'it' ? 'Copia' : locale === 'hi' ? 'कॉपी' : locale === 'ar' ? 'نسخ' : locale === 'ru' ? 'Копировать' : locale === 'th' ? 'คัดลอก' : locale === 'vi' ? 'Sao chép' : locale === 'id' ? 'Salin' : locale === 'tr' ? 'Kopyala' : locale === 'pl' ? 'Kopiuj' : locale === 'nl' ? 'Kopiëren' : locale === 'sv' ? 'Kopiera' : locale === 'cs' ? 'Kopírovat' : locale === 'el' ? 'Αντιγραφή' : locale === 'uk' ? 'Копіювати' : locale === 'ro' ? 'Copiază' : locale === 'hu' ? 'Másol' : locale === 'da' ? 'Kopiér' : locale === 'no' ? 'Kopier' : locale === 'fi' ? 'Kopioi' : locale === 'he' ? 'העתק' : locale === 'ms' ? 'Salin' : locale === 'pt-BR' ? 'Copiar' : 'Copy';
  const copiedText = locale === 'en' ? 'Copied!' : locale === 'zh-TW' ? '已複製！' : locale === 'es' ? '¡Copiado!' : locale === 'ja' ? 'コピー済み！' : locale === 'de' ? 'Kopiert!' : locale === 'fr' ? 'Copié !' : locale === 'ko' ? '복사됨!' : locale === 'it' ? 'Copiato!' : locale === 'pt' ? 'Copiado!' : locale === 'ru' ? 'Скопировано!' : locale === 'ar' ? 'تم النسخ!' : locale === 'hi' ? 'कॉपी हो गया!' : locale === 'th' ? 'คัดลอกแล้ว!' : locale === 'vi' ? 'Đã sao chép!' : locale === 'id' ? 'Disalin!' : locale === 'tr' ? 'Kopyalandı!' : locale === 'pl' ? 'Skopiowano!' : locale === 'nl' ? 'Gekopieerd!' : locale === 'sv' ? 'Kopierad!' : locale === 'cs' ? 'Zkopírováno!' : locale === 'el' ? 'Αντιγράφηκε!' : locale === 'uk' ? 'Скопійовано!' : locale === 'ro' ? 'Copiat!' : locale === 'hu' ? 'Másolva!' : locale === 'da' ? 'Kopieret!' : locale === 'no' ? 'Kopiert!' : locale === 'fi' ? 'Kopioitu!' : locale === 'he' ? 'הועתק!' : locale === 'ms' ? 'Disalin!' : locale === 'pt-BR' ? 'Copiado!' : 'Copied!';
  
  return (
    <button onClick={copy} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition">
      {copied ? <><Check size={16} /> {copiedText}</> : <><Copy size={16} /> {copyText} {char}</>}
    </button>
  );
}
