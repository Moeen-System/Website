export const DEFAULT_CURRENCY = 'USD';
export const CURRENCY_OPTIONS = {
  USD: { rate: 1, unit: '$', label: 'USD ($)' },
  SAR: { rate: 3.75, unit: 'SAR', label: 'SAR' },
  JOD: { rate: 0.709, unit: 'JD', label: 'JD' },
};

export function wholePrice(usdCents, currency) {
  return Math.round(usdCents * CURRENCY_OPTIONS[currency].rate / 100);
}

export function formatPrice(usdCents, currency) {
  const amount = wholePrice(usdCents, currency).toLocaleString('en-US');
  const { unit } = CURRENCY_OPTIONS[currency];
  return currency === 'USD' ? unit + amount : amount + '\u00a0' + unit;
}

export async function detectPricingCurrency() {
  try {
    const response = await fetch('/cdn-cgi/trace', {
      cache: 'no-store', credentials: 'omit', signal: AbortSignal.timeout(2500),
    });
    if (response.ok) {
      const country = /^loc=([A-Z]{2})\r?$/m.exec(await response.text())?.[1];
      if (country === 'SA') return 'SAR';
      if (country === 'JO') return 'JOD';
    }
  } catch {
    // A static preview or a visitor with a blocked lookup can still select a currency.
  }
  return DEFAULT_CURRENCY;
}
