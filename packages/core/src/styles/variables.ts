import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

export const cssVariables = {
  colors: Object.entries(colors).reduce((acc, [key, value]) => {
    acc[`--color-${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
  
  spacing: Object.entries(spacing).reduce((acc, [key, value]) => {
    acc[`--spacing-${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
  
  typography: {
    '--font-family': typography.fontFamily,
    ...Object.entries(typography.fontSizes).reduce((acc, [key, value]) => {
      acc[`--font-size-${key}`] = value;
      return acc;
    }, {} as Record<string, string>),
    ...Object.entries(typography.lineHeights).reduce((acc, [key, value]) => {
      acc[`--line-height-${key}`] = value;
      return acc;
    }, {} as Record<string, string>)
  }
};