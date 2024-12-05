import { createElement } from '../utils/dom';
import type { ImageProcessingOptions } from '../types/options';

export class OptionsPanel {
  private container: HTMLElement;
  private options: ImageProcessingOptions;
  private onChange: (options: ImageProcessingOptions) => void;

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

    // SVG Mode Selection
    const modeGroup = this.createGroup('SVG Mode');
    const modeSelect = createElement('select', { class: 'options-select' }) as HTMLSelectElement;
    modeSelect.innerHTML = `
      <option value="color">Color SVG</option>
      <option value="monochrome">Monochrome SVG</option>
    `;
    modeSelect.value = this.options.mode;
    modeSelect.addEventListener('change', () => {
      this.options.mode = modeSelect.value as 'color' | 'monochrome';
      this.onChange(this.options);
    });
    modeGroup.appendChild(modeSelect);

    // Color Options
    const colorGroup = this.createGroup('Colors');
    const colorInput = createElement('input', {
      type: 'color',
      class: 'options-color',
      value: this.options.color
    }) as HTMLInputElement;
    colorInput.addEventListener('change', () => {
      this.options.color = colorInput.value;
      this.onChange(this.options);
    });
    colorGroup.appendChild(colorInput);

    // Potrace Options
    const potraceGroup = this.createGroup('Potrace Options');
    
    // Threshold
    const thresholdInput = this.createRangeInput(
      'Threshold',
      this.options.threshold,
      0,
      255,
      1,
      (value) => {
        this.options.threshold = value;
        this.onChange(this.options);
      }
    );
    potraceGroup.appendChild(thresholdInput);

    // Turd Size
    const turdSizeInput = this.createRangeInput(
      'Noise Removal',
      this.options.turdSize,
      0,
      100,
      1,
      (value) => {
        this.options.turdSize = value;
        this.onChange(this.options);
      }
    );
    potraceGroup.appendChild(turdSizeInput);

    // Alpha Max
    const alphaMaxInput = this.createRangeInput(
      'Corner Threshold',
      this.options.alphaMax,
      0,
      1,
      0.1,
      (value) => {
        this.options.alphaMax = value;
        this.onChange(this.options);
      }
    );
    potraceGroup.appendChild(alphaMaxInput);

    // Turn Policy
    const turnPolicySelect = createElement('select', { class: 'options-select' }) as HTMLSelectElement;
    turnPolicySelect.innerHTML = `
      <option value="minority">Minority</option>
      <option value="majority">Majority</option>
      <option value="black">Black</option>
      <option value="white">White</option>
      <option value="left">Left</option>
      <option value="right">Right</option>
    `;
    turnPolicySelect.value = this.options.turnPolicy;
    turnPolicySelect.addEventListener('change', () => {
      this.options.turnPolicy = turnPolicySelect.value as any;
      this.onChange(this.options);
    });
    potraceGroup.appendChild(turnPolicySelect);

    panel.appendChild(modeGroup);
    panel.appendChild(colorGroup);
    panel.appendChild(potraceGroup);
    
    this.container.appendChild(panel);
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