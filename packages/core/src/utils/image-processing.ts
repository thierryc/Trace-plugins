import potrace from 'potrace';
import type { ImageProcessingOptions } from '../types/options';

// Properly wrap potrace.trace in a promise
const tracePromise = (imageData: Buffer | string, options?: ImageProcessingOptions): Promise<string> => {
  const potraceOptions = options ? options : {};
  return new Promise((resolve, reject) => {
    potrace.trace(imageData, potraceOptions, (err, svgData) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(svgData);
    });
  });
};

// Properly wrap potrace.trace in a promise
const posterizePromise = (imageData: Buffer | string, options?: ImageProcessingOptions): Promise<string> => {
  const potraceOptions = options ? options : {};
  return new Promise((resolve, reject) => {
    potrace.posterize(imageData, potraceOptions, (err, svgData) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(svgData);
    });
  });
};


export const imageToSvg = async (
  imageData: Buffer | string,
  options: ImageProcessingOptions
): Promise<string> => {

  console.log(options);

  try {
    const potraceOptions: ImageProcessingOptions = {
      turdSize: options.turdSize,
      turnPolicy: options.turnPolicy,
      alphaMax: options.alphaMax,
      optCurve: options.optCurve,
      optTolerance: options.optTolerance,
      threshold: options.threshold,
      blackOnWhite: options.blackOnWhite,
      color: options.mode === 'monochrome' ? options.color : '#000000',
      background: options.background,
      mode: options.mode
    };

    let svgData;

    if (options.mode === 'monochrome') {
      svgData = await tracePromise(imageData, potraceOptions);
    } else {
      svgData = await posterizePromise(imageData, potraceOptions);
    }

    return svgData;
  } catch (error) {
    console.error('Error converting image to SVG:', error);
    throw error;
  }
};