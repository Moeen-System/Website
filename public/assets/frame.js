// The page frame shared by every page: the home page's double seam, drawn inside a page's own
// column. Its lines run the full width, its pattern stays between the rails, and a plus marks
// each corner (see .sep in landing.css).
export const seam = (pattern = 'dots') => `<div class="sep" data-seam="${pattern}" aria-hidden="true"></div>`;
