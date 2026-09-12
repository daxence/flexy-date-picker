import type { CSSProperties } from 'react';
import type { DatePickerTheme } from '../types';

export function buildThemeVars(theme?: DatePickerTheme): CSSProperties {
  if (!theme) return {};

  const map: Record<string, string | undefined> = {
    '--fldp-primary': theme.primary,
    '--fldp-primary-hover': theme.primaryHover,
    '--fldp-primary-foreground': theme.primaryForeground,
    '--fldp-background': theme.background,
    '--fldp-surface': theme.surface,
    '--fldp-surface-strong': theme.surfaceStrong,
    '--fldp-foreground': theme.foreground,
    '--fldp-muted': theme.muted,
    '--fldp-accent-soft': theme.accentSoft,
    '--fldp-muted-foreground': theme.mutedForeground,
    '--fldp-border': theme.border,
    '--fldp-input-background': theme.inputBackground,
    '--fldp-border-radius': theme.borderRadius,
    '--fldp-day-border-radius': theme.dayBorderRadius,
    '--fldp-shadow': theme.shadow,
    '--fldp-font-family': theme.fontFamily,
    '--fldp-font-size': theme.fontSize,
    '--fldp-today-color': theme.todayColor,
    '--fldp-disabled-opacity': theme.disabledOpacity,
    '--fldp-transition-duration': theme.transitionDuration,
    '--fldp-z-index': theme.zIndex,
    '--fldp-gold': theme.primary,
    '--fldp-gold-light': theme.primaryHover ?? theme.primary,
  };

  const vars: Record<string, string> = {};
  for (const [token, value] of Object.entries(map)) {
    if (value !== undefined) vars[token] = value;
  }

  return vars as CSSProperties;
}
