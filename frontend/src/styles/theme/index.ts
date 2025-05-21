import { colors, type ColorSystem } from './colors';
import { typography, type TypographySystem } from './typography';
import { spacing, type SpacingSystem } from './spacing';
import { animations, type AnimationSystem } from './animations';
import { layout, type LayoutSystem } from './layout';

export const theme = {
  colors,
  typography,
  spacing,
  animations,
  layout,
} as const;

export type Theme = {
  colors: ColorSystem;
  typography: TypographySystem;
  spacing: SpacingSystem;
  animations: AnimationSystem;
  layout: LayoutSystem;
};

export default theme;

// Type exports
export type { ColorSystem, TypographySystem, SpacingSystem, AnimationSystem }; 