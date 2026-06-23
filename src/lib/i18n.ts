export const locales = ['en', 'zh-TW', 'es', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  'zh-TW': '繁體中文',
  es: 'Español',
  ja: '日本語',
};

type TranslationKeys = {
  'site.title': string;
  'site.description': string;
  'nav.home': string;
  'nav.categories': string;
  'nav.blog': string;
  'nav.about': string;
  'nav.privacy': string;
  'nav.terms': string;
  'nav.disclaimer': string;
  'nav.cookies': string;
  'footer.rights': string;
  'footer.twemoji': string;
  'footer.disclaimer': string;
  'common.search': string;
  'common.search_placeholder': string;
  'common.copy': string;
  'common.copied': string;
  'common.view_all': string;
  'common.popular': string;
  'common.related': string;
  'common.keywords': string;
  'common.category': string;
  'common.codepoint': string;
  'common.html_entity': string;
  'common.how_to_type': string;
  'common.no_results': string;
  'home.hero_title': string;
  'home.hero_subtitle': string;
  'home.browse_categories': string;
  'home.popular_emojis': string;
  'home.browse_all': string;
  'home.stats_emojis': string;
  'home.stats_categories': string;
  'home.stats_locales': string;
  'emoji.meaning': string;
  'emoji.usage': string;
};

const translations: Record<Locale, TranslationKeys> = {
  en: {
    'site.title': 'EmojiDict',
    'site.description': 'Search and discover the meaning of every emoji. Free online emoji dictionary with definitions, keywords, and usage examples.',
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Terms',
    'nav.disclaimer': 'Disclaimer',
    'nav.cookies': 'Cookies',
    'footer.rights': 'All rights reserved.',
    'footer.twemoji': 'Emoji images from Twemoji (MIT License)',
    'footer.disclaimer': 'Meanings are for educational purposes.',
    'common.search': 'Search',
    'common.search_placeholder': 'Search emojis by name, keyword, or paste an emoji...',
    'common.copy': 'Copy',
    'common.copied': 'Copied!',
    'common.view_all': 'View All',
    'common.popular': 'Popular',
    'common.related': 'Related Emojis',
    'common.keywords': 'Keywords',
    'common.category': 'Category',
    'common.codepoint': 'Unicode Codepoint',
    'common.html_entity': 'HTML Entity',
    'common.how_to_type': 'How to Type',
    'common.no_results': 'No emojis found. Try a different search.',
    'home.hero_title': 'Find the Meaning of Any Emoji',
    'home.hero_subtitle': 'The free emoji dictionary with definitions, usage tips, and related emojis for over 500 emojis.',
    'home.browse_categories': 'Browse by Category',
    'home.popular_emojis': 'Popular Emojis',
    'home.browse_all': 'Browse All Emojis',
    'home.stats_emojis': 'Emojis',
    'home.stats_categories': 'Categories',
    'home.stats_locales': 'Languages',
    'emoji.meaning': 'Meaning',
    'emoji.usage': 'Usage',
  },
  'zh-TW': {
    'site.title': 'EmojiDict 表情符號辭典',
    'site.description': '搜尋並發現每個表情符號的含義。免費的線上表情符號字典，包含定義、關鍵字和用法示例。',
    'nav.home': '首頁',
    'nav.categories': '分類',
    'nav.blog': '部落格',
    'nav.about': '關於',
    'nav.privacy': '隱私',
    'nav.terms': '條款',
    'nav.disclaimer': '免責聲明',
    'nav.cookies': 'Cookie',
    'footer.rights': '保留所有權利。',
    'footer.twemoji': '表情符號圖片來自 Twemoji（MIT 授權）',
    'footer.disclaimer': '含義僅供教育目的使用。',
    'common.search': '搜尋',
    'common.search_placeholder': '按名稱、關鍵字搜尋表情符號，或貼上表情符號...',
    'common.copy': '複製',
    'common.copied': '已複製！',
    'common.view_all': '查看全部',
    'common.popular': '熱門',
    'common.related': '相關表情符號',
    'common.keywords': '關鍵字',
    'common.category': '分類',
    'common.codepoint': 'Unicode 碼位',
    'common.html_entity': 'HTML 實體',
    'common.how_to_type': '如何輸入',
    'common.no_results': '找不到表情符號。請嘗試其他搜尋。',
    'home.hero_title': '尋找任何表情符號的含義',
    'home.hero_subtitle': '免費的表情符號字典，包含超過 500 個表情符號的定義、用法和相關表情符號。',
    'home.browse_categories': '按分類瀏覽',
    'home.popular_emojis': '熱門表情符號',
    'home.browse_all': '瀏覽所有表情符號',
    'home.stats_emojis': '表情符號',
    'home.stats_categories': '分類',
    'home.stats_locales': '語言',
    'emoji.meaning': '含義',
    'emoji.usage': '用法',
  },
  es: {
    'site.title': 'EmojiDict Diccionario de Emojis',
    'site.description': 'Busca y descubre el significado de cada emoji. Diccionario de emojis en línea gratis con definiciones, palabras clave y ejemplos de uso.',
    'nav.home': 'Inicio',
    'nav.categories': 'Categorías',
    'nav.blog': 'Blog',
    'nav.about': 'Acerca de',
    'nav.privacy': 'Privacidad',
    'nav.terms': 'Términos',
    'nav.disclaimer': 'Descargo',
    'nav.cookies': 'Cookies',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.twemoji': 'Imágenes de emoji de Twemoji (Licencia MIT)',
    'footer.disclaimer': 'Los significados son con fines educativos.',
    'common.search': 'Buscar',
    'common.search_placeholder': 'Busca emojis por nombre, palabra clave o pega un emoji...',
    'common.copy': 'Copiar',
    'common.copied': '¡Copiado!',
    'common.view_all': 'Ver Todo',
    'common.popular': 'Popular',
    'common.related': 'Emojis Relacionados',
    'common.keywords': 'Palabras Clave',
    'common.category': 'Categoría',
    'common.codepoint': 'Punto de Código Unicode',
    'common.html_entity': 'Entidad HTML',
    'common.how_to_type': 'Cómo Escribir',
    'common.no_results': 'No se encontraron emojis. Prueba otra búsqueda.',
    'home.hero_title': 'Encuentra el Significado de Cualquier Emoji',
    'home.hero_subtitle': 'El diccionario de emojis gratis con definiciones, consejos de uso y emojis relacionados para más de 500 emojis.',
    'home.browse_categories': 'Explorar por Categoría',
    'home.popular_emojis': 'Emojis Populares',
    'home.browse_all': 'Explorar Todos los Emojis',
    'home.stats_emojis': 'Emojis',
    'home.stats_categories': 'Categorías',
    'home.stats_locales': 'Idiomas',
    'emoji.meaning': 'Significado',
    'emoji.usage': 'Uso',
  },
  ja: {
    'site.title': 'EmojiDict 絵文字辞典',
    'site.description': 'すべての絵文字の意味を検索して発見。定義、キーワード、使用例を含む無料のオンライン絵文字辞書。',
    'nav.home': 'ホーム',
    'nav.categories': 'カテゴリー',
    'nav.blog': 'ブログ',
    'nav.about': '概要',
    'nav.privacy': 'プライバシー',
    'nav.terms': '利用規約',
    'nav.disclaimer': '免責事項',
    'nav.cookies': 'Cookie',
    'footer.rights': '全著作権所有。',
    'footer.twemoji': '絵文字画像：Twemoji（MITライセンス）',
    'footer.disclaimer': '意味は教育目的のみです。',
    'common.search': '検索',
    'common.search_placeholder': '名前やキーワードで絵文字を検索、または絵文字を貼り付け...',
    'common.copy': 'コピー',
    'common.copied': 'コピーしました！',
    'common.view_all': 'すべて見る',
    'common.popular': '人気',
    'common.related': '関連絵文字',
    'common.keywords': 'キーワード',
    'common.category': 'カテゴリー',
    'common.codepoint': 'Unicodeコードポイント',
    'common.html_entity': 'HTMLエンティティ',
    'common.how_to_type': '入力方法',
    'common.no_results': '絵文字が見つかりません。別の検索を試してください。',
    'home.hero_title': 'あらゆる絵文字の意味を見つけよう',
    'home.hero_subtitle': '500種類以上の絵文字の定義、使い方、関連絵文字を含む無料の絵文字辞典。',
    'home.browse_categories': 'カテゴリーで探す',
    'home.popular_emojis': '人気の絵文字',
    'home.browse_all': 'すべての絵文字を見る',
    'home.stats_emojis': '絵文字',
    'home.stats_categories': 'カテゴリー',
    'home.stats_locales': '言語',
    'emoji.meaning': '意味',
    'emoji.usage': '使い方',
  },
};

export function t(locale: Locale, key: keyof TranslationKeys): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}
