import potrace from 'potrace';
import type { ImageProcessingOptions } from '../types/options';

// Properly wrap potrace.trace in a promise
const tracePromise = (imageData: Buffer | string, options?: ImageProcessingOptions): Promise<string> => {
  const potraceOptions = options ? options : {};
  console.log('tracePromise', potraceOptions);
  
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
  console.log('posterizePromise', potraceOptions);
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

  console.log('options:', options.steps);

  try {
    const potraceOptions: ImageProcessingOptions = {
      turdSize: options.turdSize,
      turnPolicy: options.turnPolicy,
      alphaMax: options.alphaMax,
      optCurve: options.optCurve,
      optTolerance: options.optTolerance,
      threshold: options.threshold,
      blackOnWhite: options.blackOnWhite,
      color: options.color,
      background: options.background,
      mode: options.mode,
      fillStrategy: options.fillStrategy,
      rangeDistribution: options.rangeDistribution,
    };

    if (Array.isArray(options.steps) || typeof options.steps === 'number' && options.steps > 0) {
      potraceOptions.steps = options.steps;
    }

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