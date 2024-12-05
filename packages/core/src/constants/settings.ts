
export const potraceImagePreset = {
    logotype: {
        name: "logotype",
        description: "clean and bold shapes",
        options: {
            turdSize: 3,
            turnPolicy: 'minority',
            alphaMax: 0.7,
            optCurve: true,
            optTolerance: 0.2,
            threshold: 150,
            blackOnWhite: true
        }
    },
    doodle: {
        name: "doodle",
        description: "hand-drawn feel",
        options: {
            turdSize: 1,
            turnPolicy: 'left',
            alphaMax: 0.5,
            optCurve: false,
            optTolerance: 0.1,
            threshold: 100,
            blackOnWhite: true
          }
    },
    image: {
        name: "image",
        description: "simple vector from photo",
        options: {
            turdSize: 1,
            turnPolicy: 'left',
            alphaMax: 0.5,
            optCurve: false,
            optTolerance: 0.1,
            threshold: 100,
            blackOnWhite: true
          }
    }
};

