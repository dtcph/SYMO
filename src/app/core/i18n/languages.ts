export interface Language {
  code: string;
  label: string;
  native: string;
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'zh', label: 'Chinese (Simplified)', native: '简体中文' },
  { code: 'zh-TW', label: 'Chinese (Traditional)', native: '繁體中文' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'pt', label: 'Portuguese', native: 'Português' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'ar', label: 'Arabic', native: 'العربية', rtl: true },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'th', label: 'Thai', native: 'ไทย' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands' },
  { code: 'pl', label: 'Polish', native: 'Polski' },
  { code: 'fil', label: 'Filipino', native: 'Filipino' },
  { code: 'mn', label: 'Mongolian', native: 'Монгол' },
  { code: 'uk', label: 'Ukrainian', native: 'Українська' },
  { code: 'ms', label: 'Malay', native: 'Bahasa Melayu' },
  { code: 'fa', label: 'Persian', native: 'فارسی', rtl: true },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ur', label: 'Urdu', native: 'اردو', rtl: true },
];