import { createElement } from '../utils/dom';
import { potraceImagePreset } from '../constants/preset';
import type { ImageProcessingOptions } from '../types/options';
import type { PotracePreset } from '../types/preset';

export class OptionsPanel {
  private container: HTMLElement;
  private options: ImageProcessingOptions;
  private onChange: (options: ImageProcessingOptions) => void;

  // UI Elements
  private modeSelect!: HTMLSelectElement;
  private colorBooleanInput!: HTMLInputElement;
  private colorInput!: HTMLInputElement;
  private backgroundColorBooleanInput!: HTMLInputElement;
  private backgroundColorInput!: HTMLInputElement;
  private thresholdContainer!: HTMLDivElement;
  private thresholdInput!: HTMLInputElement;
  private optToleranceContainer!: HTMLDivElement;
  private optToleranceInput!: HTMLInputElement;
  private turdSizeContainer!: HTMLDivElement;
  private turdSizeInput!: HTMLInputElement;
  private alphaMaxContainer!: HTMLDivElement;
  private alphaMaxInput!: HTMLInputElement;
  private turnPolicySelect!: HTMLSelectElement;
  private fillStrategySelect!: HTMLSelectElement;

  constructor(
    container: HTMLElement,
    initialOptions: ImageProcessingOptions,
    onChange: (options: ImageProcessingOptions) => void
  ) {
    this.container = container;
    this.options = initialOptions;
    this.onChange = onChange;
    this.init();
  }

  private init() {
    const panel = createElement('div', { class: 'options-panel' });

    // Preset Selection
    const presetGroup = this.createGroup('Preset');
    const presetSelect = createElement('select', { class: 'options-select' }) as HTMLSelectElement;

    // Dynamic preset options generation
    presetSelect.innerHTML =
      Object.entries(potraceImagePreset)
        .map(([key, preset]) =>
          `<option value="${key}">${preset.name.charAt(0).toUpperCase() + preset.name.slice(1)} - ${preset.description}</option>`
        )
        .join('') +
      `<option value="">Custom</option>`;

    presetSelect.value = 'default'
    presetSelect.addEventListener('change', () => {
      if (presetSelect.value) {
        potraceGroup.style.display = 'none';
        this.applyPreset(presetSelect.value);
      } else {
        console.log(potraceGroup);
        potraceGroup.style.display = 'block';
      }
    });
    presetGroup.appendChild(presetSelect);

    // SVG Mode Selection
    const modeGroup = document.createElement('div');
    this.modeSelect = document.createElement('select');
    const modeSelectOptions = [{ value: 'monochrome', label: 'Monochrome SVG' }, { value: 'color', label: 'Color SVG' }];
    modeSelectOptions.forEach(({ value, label }) => {
      const option = document.createElement('option');
      option.value = value;  // Set the value attribute
      option.textContent = label;  // Set the displayed text
      this.modeSelect.appendChild(option);  // Append the option to the select
    });

    this.modeSelect.value = this.options.mode;

    this.modeSelect.addEventListener('change', () => {
      this.options.mode = this.modeSelect.value as 'color' | 'monochrome';
      this.onChange(this.options);
    });
    modeGroup.appendChild(this.modeSelect);

    // Color Options
    const colorGroup = this.createGroup('Colors');

    const colorCell = createElement('div', { class: 'options-cell' });
    const colorInputLabel = document.createElement('label');
    colorInputLabel.textContent = 'Color: '; // Set the label text
    colorInputLabel.htmlFor = 'colorInput'; // Associate with the input's ID
    this.colorInput = createElement('input', {
      type: 'color',
      class: 'options-color',
      value: this.options.color !== 'auto' ? this.options.color  : 'black',
    }) as HTMLInputElement;
    this.colorInput.id = 'colorInput';
    this.colorInput.addEventListener('change', () => {
      if (this.colorBooleanInput.checked) {
        this.options.color = this.colorInput.value;
      } else {
        this.options.color = 'auto';
      }
      this.onChange(this.options);
    });
    this.colorInput.disabled = true;
    this.colorBooleanInput = document.createElement('input');
    this.colorBooleanInput.type = 'checkbox'; // Set type to checkbox
    this.colorBooleanInput.checked = this.options.color !== 'auto';
    this.colorBooleanInput.addEventListener('change', () => {
      if (this.colorBooleanInput.checked) {
        this.colorInput.disabled = false;
        this.options.color = this.colorInput.value;
      } else { 
        this.colorInput.disabled = true;
        this.options.color = 'auto';
      }
      this.onChange(this.options);
    });
    colorCell.appendChild(colorInputLabel);
    const colorInputsGroup = createElement('div', { class: 'options-cell-inputs' });
    colorInputsGroup.appendChild(this.colorBooleanInput);
    colorInputsGroup.appendChild(this.colorInput);
    colorCell.appendChild(colorInputsGroup);
    colorGroup.appendChild(colorCell);

    // backgroundColor Options
    const backgroundColorCell = createElement('div', { class: 'options-cell' });
    const backgroundColorInputLabel = document.createElement('label');
    backgroundColorInputLabel.textContent = 'Background: '; // Set the label text
    backgroundColorInputLabel.htmlFor = 'backgroundColorInput'; // Associate with the input's ID

    this.backgroundColorInput = createElement('input', {
      type: 'color',
      class: 'options-color',
      value: this.options.background !== 'transparent' ? this.options.background  : 'white',
    }) as HTMLInputElement;
    this.backgroundColorInput.disabled = true;

    this.backgroundColorInput.id = 'backgroundColorInput';
    this.backgroundColorInput.addEventListener('change', () => {
      if (this.backgroundColorBooleanInput.checked) {
        this.backgroundColorInput.disabled = false;
        this.options.background = this.backgroundColorInput.value;
      } else {
        this.backgroundColorInput.disabled = true;
        this.options.background = 'transparent';
      }
      this.onChange(this.options);
    });

    this.backgroundColorBooleanInput = document.createElement('input');
    this.backgroundColorBooleanInput.type = 'checkbox'; // Set type to checkbox
    this.backgroundColorBooleanInput.checked = this.options.background !== 'transparent';
    this.backgroundColorBooleanInput.addEventListener('change', () => {
      if (this.backgroundColorBooleanInput.checked) {
        this.backgroundColorInput.disabled = false;
        this.options.background = this.backgroundColorInput.value;
      } else {
        this.backgroundColorInput.disabled = true;
        this.options.background = 'transparent';
      }
      this.onChange(this.options);
    });

    backgroundColorCell.appendChild(backgroundColorInputLabel);
    const backgroundColorInputsGroup = createElement('div', { class: 'options-cell-inputs' });
    backgroundColorInputsGroup.appendChild(this.backgroundColorBooleanInput);
    backgroundColorInputsGroup.appendChild(this.backgroundColorInput);
    backgroundColorCell.appendChild(backgroundColorInputsGroup);
    colorGroup.appendChild(backgroundColorCell);

    // Potrace Options
    const potraceGroup = this.createGroup('Potrace Advanced Options');
    potraceGroup.style.display = 'none';

    // Turd Size
    this.turdSizeContainer = this.createRangeInput(
      'Noise Removal',
      this.options.turdSize,
      -1,
      1000,
      1,
      (value) => {
        this.options.turdSize = value;
        this.onChange(this.options);
      }
    ) as HTMLInputElement;
    this.turdSizeInput = this.turdSizeContainer.querySelector('input') as HTMLInputElement;
    potraceGroup.appendChild(this.turdSizeContainer);

    const turdSizeInputInsights = document.createElement('p');
    turdSizeInputInsights.textContent = 'Adjusts the threshold for eliminating small speckles in the image. Higher values will suppress more small details, effectively cleaning up the image.';
    potraceGroup.appendChild(turdSizeInputInsights);

    // Alpha Max
    this.alphaMaxContainer = this.createRangeInput(
      'Corner Threshold',
      this.options.alphaMax,
      0,
      2,
      0.1,
      (value) => {
        this.options.alphaMax = value;
        this.onChange(this.options);
      }
    ) as HTMLInputElement;
    this.alphaMaxInput = this.alphaMaxContainer.querySelector('input') as HTMLInputElement;
    potraceGroup.appendChild(this.alphaMaxContainer);

    const alphaMaxInputInsights = document.createElement('p');
    alphaMaxInputInsights.textContent = 'Corner threshold (alphaMax) parameter controlling curve sharpness: Lower values create smoother curves, Higher values create more angular/sharp paths';
    potraceGroup.appendChild(alphaMaxInputInsights);

    // Threshold
    this.thresholdContainer = this.createRangeInput(
      'Threshold',
      this.options.threshold || -1,
      -1,
      255,
      1,
      (value) => {
        this.options.threshold = value;
        this.onChange(this.options);
      }
    ) as HTMLInputElement;
    this.thresholdInput = this.thresholdContainer.querySelector('input') as HTMLInputElement;
    potraceGroup.appendChild(this.thresholdContainer);

    const thresholdInsights = document.createElement('p');
    thresholdInsights.textContent = 'Color threshold for black and white conversion';
    potraceGroup.appendChild(thresholdInsights);


    // Optimize Curve

    // Optimize Tolerance

    this.optToleranceContainer = this.createRangeInput(
      'Optimize Tolerance',
      this.options.optTolerance,
      0,
      1,
      0.01,
      (value) => {
        this.options.optTolerance = value;
        this.onChange(this.options);
      }
    ) as HTMLInputElement;
    this.optToleranceInput = this.optToleranceContainer.querySelector('input') as HTMLInputElement;
    potraceGroup.appendChild(this.optToleranceContainer);

    const optToleranceInsights = document.createElement('p');
    optToleranceInsights.textContent = `Tolerance for curve optimization: Lower values preserve more original path details Higher values simplify the curve more aggressively`;
    potraceGroup.appendChild(optToleranceInsights);



    // Turn Policy
    this.turnPolicySelect = createElement('select', { class: 'options-select' }) as HTMLSelectElement;
    this.turnPolicySelect.innerHTML = `
      <option value="minority">Minority</option>
      <option value="majority">Majority</option>
      <option value="black">Black</option>
      <option value="white">White</option>
      <option value="left">Left</option>
      <option value="right">Right</option>
    `;
    this.turnPolicySelect.value = this.options.turnPolicy;
    this.turnPolicySelect.addEventListener('change', () => {
      this.options.turnPolicy = this.turnPolicySelect.value as any;
      this.onChange(this.options);
    });
    potraceGroup.appendChild(this.turnPolicySelect);

    // fill Strategy
    this.fillStrategySelect = createElement('select', { class: 'options-select' }) as HTMLSelectElement;
    this.fillStrategySelect.innerHTML = `
      <option value="dominant">Dominant - most frequent color in range (used by default)</option>
      <option value="mean">Mean - arithmetic mean (average)</option>
      <option value="median">Median - median color</option>
      <option value="spread">Spread - ignores color information</option>
    `;
    this.fillStrategySelect.value = this.options.fillStrategy;
    this.fillStrategySelect.addEventListener('change', () => {
      this.options.fillStrategy = this.fillStrategySelect.value as any;
      this.onChange(this.options);
    });
    potraceGroup.appendChild(this.fillStrategySelect);

    // Add groups to panel
    panel.appendChild(presetGroup);
    panel.appendChild(modeGroup);
    panel.appendChild(colorGroup);
    panel.appendChild(potraceGroup);

    this.container.appendChild(panel);
  }

  private applyPreset(presetKey: string) {
    if (!presetKey) return;
    const preset: PotracePreset = potraceImagePreset[presetKey];
    if (!preset) return;

    this.options.mode = preset.mode;

    // Update Potrace-specific options
    this.options.turdSize = preset.options.turdSize;
    this.options.turnPolicy = preset.options.turnPolicy as any;
    this.options.alphaMax = preset.options.alphaMax;
    this.options.threshold = preset.options.threshold;
    this.options.optTolerance = preset.options.optTolerance;

    // Update UI elements to reflect new values
    this.turdSizeInput.value = this.options.turdSize.toString();
    this.turdSizeInput.dispatchEvent(new Event('input'));

    this.turnPolicySelect.value = this.options.turnPolicy;
    this.turnPolicySelect.dispatchEvent(new Event('change'));

    this.alphaMaxInput.value = this.options.alphaMax.toString();
    this.alphaMaxInput.dispatchEvent(new Event('input'));

    this.thresholdInput.value = this.options.threshold.toString();
    this.thresholdInput.dispatchEvent(new Event('input'));

    this.optToleranceInput.value = this.options.optTolerance.toString();
    this.optToleranceInput.dispatchEvent(new Event('input'));

    // Trigger onChange to update external state
    this.onChange(this.options);
  }

  private createGroup(title: string): HTMLElement {
    const group = createElement('div', { class: 'options-group' });
    const titleEl = createElement('h3', { class: 'options-title' }, [title]);
    group.appendChild(titleEl);
    return group;
  }

  private createRangeInput(
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onChange: (value: number) => void
  ): HTMLElement {
    const container = createElement('div', { class: 'range-container' });
    const labelEl = createElement('label', { class: 'range-label' }, [label]);
    const input = createElement('input', {
      type: 'range',
      class: 'range-input',
      min: min.toString(),
      max: max.toString(),
      step: step.toString(),
      value: value.toString()
    }) as HTMLInputElement;
    const valueDisplay = createElement('span', { class: 'range-value' }, [value.toString()]);

    input.addEventListener('input', () => {
      console.log('Input change');
      const newValue = parseFloat(input.value);
      valueDisplay.textContent = newValue.toString();
      onChange(newValue);
    });

    container.appendChild(labelEl);
    container.appendChild(input);
    container.appendChild(valueDisplay);

    return container;
  }
}