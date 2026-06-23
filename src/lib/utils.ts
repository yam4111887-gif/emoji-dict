export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return Promise.resolve(false);
}

export function htmlEntity(char: string): string {
  return char.split('').map(c => `&#x${c.codePointAt(0)?.toString(16)};`).join('');
}

export function codepointDisplay(char: string): string {
  return char.split('').map(c => 'U+' + c.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')).join(' ');
}
