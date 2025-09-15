export type ThemeName = 'dark' | 'light';

export type ThemeColors = {
  bg: string;         // screen background
  text: string;       // text on bg
  surface: string;    // cards / lists background
  onSurface: string;  // text on surface
  primary: string;    // accent color for buttons
  border: string;     // subtle borders
};

export const palettes: Record<ThemeName, ThemeColors> = {
  dark: {
    bg: '#0F1220',
    text: '#E7ECF5',
    surface: '#1A2035',
    onSurface: '#E7ECF5',
    primary: '#5562F2',
    border: '#2C3555',
  },
  light: {
    bg: '#F5F7FC',
    text: '#0F1220',
    surface: '#FFFFFF',
    onSurface: '#0F1220',
    primary: '#5562F2',
    border: '#E5EAF3',
  },
};
