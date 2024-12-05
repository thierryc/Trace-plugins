export interface ImageProcessingResult {
  svg: string;
  width: number;
  height: number;
  originalFormat: string;
}

export interface ImageProcessor {
  processImage: (input: Buffer | string) => Promise<ImageProcessingResult>;
  convertToSvg: (input: Buffer | string) => Promise<string>;
}