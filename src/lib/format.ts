const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];

/** 6 → "Six" — keeps headings in sync with the data. */
export function countWord(n: number): string {
  return words[n] ?? String(n);
}
