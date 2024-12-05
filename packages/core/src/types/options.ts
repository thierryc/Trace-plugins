export interface PotraceOptions {
  turdSize: number;
  turnPolicy: 'black' | 'white' | 'left' | 'right' | 'minority' | 'majority';
  alphaMax: number;
  optCurve: boolean;
  optTolerance: number;
  threshold: number;
  blackOnWhite: boolean;
}

export interface SvgOptions {
  mode: 'color' | 'monochrome';
  color: string;
  background: string;
}

export interface ImageProcessingOptions extends PotraceOptions, SvgOptions {}