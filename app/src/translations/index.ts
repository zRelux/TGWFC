import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import en from './en';
import it from './it';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en,
  it
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

i18n.fallbacks = true;

export const translate = (string: string) => i18n.t(string);
