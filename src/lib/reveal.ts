/**
 * One shared IntersectionObserver for every reveal on the page.
 * Elements get the `is-in` class once and are then unobserved.
 */
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
  }
  return observer;
}

export function observeReveal(el: Element): () => void {
  const io = getObserver();
  if (!io) {
    el.classList.add('is-in');
    return () => {};
  }
  io.observe(el);
  return () => io.unobserve(el);
}
