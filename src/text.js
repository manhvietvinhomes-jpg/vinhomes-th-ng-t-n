// Vietnamese syllables are space-separated; count visible text, not Markdown syntax.
export function contentWordCount(value){const plain=String(value||'').split(/\r?\n/).filter(line=>!/^\|[\s:|-]+\|$/.test(line.trim())).map(line=>line.replace(/^#{2,3}\s+/,'').replaceAll('|',' ')).join('\n').trim();return plain?plain.split(/\s+/).length:0;}
export const PILLAR_SLUGS=['tong-quan','vi-tri','quy-hoach','phap-ly','tien-do','gia-ban','mat-bang','san-pham','so-sanh'];
