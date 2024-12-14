import { createElement } from '../utils/dom';
import { imageToSvg } from '../utils/image-processing';
import { OptionsPanel } from './OptionsPanel';
import { potraceImagePreset } from '../constants/preset';
import type { ImageProcessingOptions } from '../types/options';

export class ImageUploader {
  private container: HTMLElement;
  private onVectorGenerated: (svg: string, options?: {}) => void;
  private options: ImageProcessingOptions;
  private showPreview: boolean;
  private dropZone!: HTMLElement;
  private input!: HTMLInputElement;

  constructor(containerId: string, onVectorGenerated: (svg: string, options?: {}) => void, showPreview = true) {
    this.container = document.getElementById(containerId) || document.createElement('div');
    this.onVectorGenerated = onVectorGenerated;
    this.options = {
      mode: potraceImagePreset.default.mode as 'color' | 'monochrome',
      ...potraceImagePreset.default.options,
      ...potraceImagePreset.default.posterizeOptions
    };
    this.showPreview = showPreview;
    this.init();
  }

  private init() {
    const uploadContainer = createElement('div', {
      class: 'image-uploader',
      style: 'position: relative;',
    });

    // Create drop zone
    this.dropZone = createElement('div', {
      class: 'image-uploader__drop-zone',
      style: 'cursor: pointer;',
    });

    // Create input
    // <input type="file" accept="image/png, image/jpeg, image/gif, image/webp">
    this.input = createElement('input', {
      type: 'file',
      accept: 'image/png, image/jpeg, image/gif, image/webp',
      class: 'image-uploader__input',
      id: 'image-upload',
      style: 'position: absolute; opacity: 0; pointer-events: none; z-index: -2; top: -100px; left: -100px; width: 1px; hheight: 1px;',
    }) as HTMLInputElement;

    const label = createElement('label', {
      for: 'image-upload',
      class: 'image-uploader__label',
      style: 'pointer-events: none;',
    }, ['Click to Upload Image or Drag and Drop']);

    let preview = null;

    if (this.showPreview) {
      preview = createElement('div', {
        class: 'image-uploader__preview',
        style: 'position: absolute; z-index: -1; top: 0px; width: 100%; opacity: 0.2; aspect-ratio: 4 / 3; display: grid; place-items: center; border-radius: 4px;'
      });
    }

    const optionsContainer = createElement('div', {
      class: 'image-uploader__options'
    });

    // Add event listeners for drag and drop
    this.setupDropZoneListeners();

    this.input.addEventListener('change', this.handleImageUpload.bind(this));

    this.dropZone.appendChild(this.input);
    this.dropZone.appendChild(label);

    uploadContainer.appendChild(this.dropZone);
    uploadContainer.appendChild(optionsContainer);
    if (preview) {
      uploadContainer.appendChild(preview);
    }

    this.dropZone.addEventListener('click', (event) => {
      event.stopPropagation();
      this.input.value = '';
      this.input.click();
    });

    this.container.appendChild(uploadContainer);

    // Initialize options panel
    new OptionsPanel(optionsContainer, this.options, (newOptions) => {
      console.log(newOptions);
      this.options = newOptions;
      this.updatePreview();
    });
  }

  private setupDropZoneListeners() {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, this.preventDefaults, false);
      document.body.addEventListener(eventName, this.preventDefaults, false);
    });

    // Highlight drop zone when item is dragged over
    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, this.highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, this.unhighlight, false);
    });

    // Handle dropped files
    this.dropZone.addEventListener('drop', this.handleDrop, false);
  }

  private preventDefaults = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }

  private highlight = () => {
    this.dropZone.classList.add('highlight');
  }

  private unhighlight = () => {
    this.dropZone.classList.remove('highlight');
  }

  private handleDrop = (e: DragEvent) => {
    const dt = e.dataTransfer;
    const files = dt?.files;
    const file = files?.[0];

    if (!file) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    // Set the files to the input
    this.input.files = dataTransfer.files;
    this.input.dispatchEvent(new Event('change'));

  }

  private async handleImageUpload(event: Event) {


    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        await this.processAndPreview(imageData);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }

  private async processAndPreview(imageData: string) {
    try {
      const svg = await imageToSvg(imageData, this.options);
      this.onVectorGenerated(svg, this.options);

      const preview = this.container.querySelector('.image-uploader__preview');
      if (preview) {
        preview.innerHTML = svg.replace(/(width|height)=\"[^\"]*\"/g, '');
      }
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }

  private async updatePreview() {
    const preview = this.container.querySelector('.image-uploader__preview');
    if (preview && preview.innerHTML) {
      const svg = preview.querySelector('svg');
      if (svg) {
        if (this.options.mode === 'monochrome') {
          svg.style.fill = this.options.color;
        } else {
          svg.style.fill = '';
        }
      }
    }
  }
}