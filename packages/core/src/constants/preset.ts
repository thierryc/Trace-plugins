import type { PotraceImagePresetType } from '../types/preset';

export const potraceImagePreset: PotraceImagePresetType = {
    default:  {
        name: "default",
        description: "The default setting",
        mode: 'monochrome',
        options: {
            turdSize: 2,
            turnPolicy: 'minority',
            alphaMax: 0.7,
            optCurve: true,
            optTolerance: 0.2,
            threshold: 128,
            blackOnWhite: true,
            background: 'transparent',
            color: 'auto'
        },
        posterizeOptions: {
            fillStrategy: 'dominant',
            rangeDistribution: 'auto',
            steps: -1,
        }
    },
    logotype: {
        name: "logotype",
        description: "clean and bold shapes",
        mode: 'monochrome',
        options: {
            turdSize: 3,
            turnPolicy: 'minority',
            alphaMax: 0.7,
            optCurve: true,
            optTolerance: 0.2,
            threshold: 150,
            blackOnWhite: true,
            background: '',
            color: 'auto'
        },
        posterizeOptions: {
            fillStrategy: 'dominant',
            rangeDistribution: 'auto',
            steps: -1,
        }
    },
    doodle: {
        name: "doodle",
        description: "hand-drawn feel",
        mode: 'monochrome',
        options: {
            turdSize: 1,
            turnPolicy: 'left',
            alphaMax: 0.5,
            optCurve: false,
            optTolerance: 0.1,
            threshold: 100,
            blackOnWhite: true,
            color: 'auto',
            background: 'transparent'
        },
        posterizeOptions: {
            fillStrategy: 'dominant',
            rangeDistribution: 'auto',
            steps: -1,
        }
    },
    image: {
        name: "image",
        description: "simple vector from photo",
        mode: 'color',
        options: {
            turdSize: 1,
            turnPolicy: 'left',
            alphaMax: 0.5,
            optCurve: false,
            optTolerance: 0.1,
            threshold: 100,
            blackOnWhite: true,
            color: 'auto',
            background: 'transparent'
        },
        posterizeOptions: {
            fillStrategy: 'dominant',
            rangeDistribution: 'auto',
            steps: [0, 30, 80, 130, 200, 255],
        }
    }
};

