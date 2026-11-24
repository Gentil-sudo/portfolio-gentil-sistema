// Formatação usada pelo <WakaTimeStats />. O último parâmetro é o locale
// ("pt-BR" ou "en-US", vem de src/i18n/translations.js).

// 457722 s → "127 h 8 min" (arredonda para baixo, como o WakaTime)
export function formatDuration(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

// 31.76 → "31,8%" (pt-BR) | "31.8%" (en-US)
export function formatPercent(percent = 0, locale = "pt-BR") {
  const format = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  if (percent > 0 && percent < 0.1) return `<${format.format(0.001)}`;
  return format.format(percent / 100);
}

// "2025-09-01" → "1 de set. de 2025" | "Sep 1, 2025"
export function formatDate(value, locale = "pt-BR") {
  if (!value) return null;
  // Meio-dia: a data não "volta" um dia em nenhum fuso
  const date = new Date(`${value.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export const formatNumber = (value, locale = "pt-BR") =>
  new Intl.NumberFormat(locale).format(value);

// timestamp em ms → "14:32" | "02:32 PM"
export const formatTime = (ms, locale = "pt-BR") =>
  new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(ms);

// Quanto tempo atrás. text = t.wakatime.ago (src/i18n/translations.js):
// "agora há pouco" | "há 3 min" | "há 2 h"
export function formatAgo(ms, now, text) {
  const minutes = Math.max(0, Math.floor((now - ms) / 60000));
  if (minutes < 1) return text.justNow;
  if (minutes < 60) return text.minutes(minutes);
  return text.hours(Math.floor(minutes / 60));
}
