const DEFAULT_LOCALE = "en-US";
const DEFAULT_TZ = "UTC";

type Config = {
  locale: string;
  timezone: string;
};

export const config: Config = {
  locale: DEFAULT_LOCALE,
  timezone: DEFAULT_TZ,
}

export function setConfig(c: Partial<Config>) {
  if (c.locale) {
    config.locale = c.locale;
  }

  if (c.timezone) {
    config.timezone = c.timezone;
  }
}