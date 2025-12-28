export let DEFAULT_LOCALE = "en-US";
export const DEFAULT_TZ = "UTC";

export function setDefaultLocale(locale: string) {
  DEFAULT_LOCALE = locale;
}