// Small text formatters shared across pages

// 'MODERN HOUSE' → 'Modern house'
export const sentenceCase = (text = '') =>
  text.charAt(0).toLocaleUpperCase() + text.slice(1).toLocaleLowerCase();

// 3 → '03'
export const pad = (number) => String(number).padStart(2, '0');

// Replace {placeholders} in a translation string
export const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match));
