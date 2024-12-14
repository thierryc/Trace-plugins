import type { PotraceOptions, PosterizeOptions } from './options'

// Define the type for individual presets
type PotracePreset = {
    name: string;
    description: string;
    mode: 'color' | 'monochrome';
    options: PotraceOptions;
    posterizeOptions: PosterizeOptions;
};

// Define the type for the entire potraceImagePreset object
type PotraceImagePresetType = {
    [key: string]: PotracePreset;
};

// Create a type guard for additional type safety
function isPotracePreset(preset: any): preset is PotracePreset {
    return (
        typeof preset === 'object' &&
        typeof preset.name === 'string' &&
        typeof preset.description === 'string' &&
        typeof preset.mode === 'string' &&
        typeof preset.options === 'object' &&
        typeof preset.posterizeOptions === 'object'
    );
}

// Optional: Export the types for use in other files
export {
    isPotracePreset
};
export type {
    PotraceOptions,
    PotracePreset,
    PotraceImagePresetType
};
