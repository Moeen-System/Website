// Arabic headers close on Thmanyah's swash: the last word of the lead phrase stretches its final
// letter into one long stroke (see .swash in landing.css). The font draws it only on a final
// ن ق ت ك ف ب ي ى ث س ش ص ض, so Arabic headers are worded to end on one of them.
const LAST_WORD = /([ؠ-ٟٮ-ۓ]+)([.،؛؟!»]*\s*)(?=<|$)/;

/** Wraps the last Arabic word of the first text run in a header's inner HTML. */
export const swash = (html) => (html.includes('class="swash"') ? html : html.replace(LAST_WORD, '<span class="swash">$1</span>$2'));

/** Applies it to every page title, section header and table caption in a block of HTML. */
export const swashHeaders = (html) => html.replace(/<(h1|h2|caption)\b([^>]*)>([\s\S]*?)<\/\1>/g,
  (whole, tag, attributes, inner) => (attributes.includes('data-plain') ? whole : `<${tag}${attributes}>${swash(inner)}</${tag}>`));
