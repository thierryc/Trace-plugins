export interface PotraceOptions {
  turdSize: number;
  turnPolicy: 'black' | 'white' | 'left' | 'right' | 'minority' | 'majority';
  alphaMax: number;
  optCurve: boolean;
  optTolerance: number;
  threshold: number;
  blackOnWhite: boolean;
  color: 'auto' | string;
  background: 'transparent' | string;
}

export interface PosterizeOptions {
  fillStrategy: 'dominant' | 'mean' | 'median' | 'spread';
  rangeDistribution?: 'auto' | 'equal';
  steps?: 'auto' | number | number[];
}

export interface SvgOptions {
  mode: 'color' | 'monochrome';
  color: string;
}

export interface ImageProcessingOptions extends PotraceOptions, PosterizeOptions, SvgOptions {}