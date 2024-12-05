import { createElement } from '../utils/dom';
import { imageToSvg } from '../utils/image-processing';
import { OptionsPanel } from './OptionsPanel';
import type { ImageProcessingOptions } from '../types/options';

export class ImageUploader {
  private container: HTMLElement;
  private onVectorGenerated: (svg: string) => void;
  private options: ImageProcessingOptions;

  constructor(containerId: string, onVectorGenerated: (svg: string) => void) {
    this.container = document.getElementById(containerId) || document.createElement('div');
    this.onVectorGenerated = onVectorGenerated;
    this.options = {
      mode: 'color',
      color: '#000000',
      background: 'transparent',
      turdSize: 2,
      turnPolicy: 'minority',
      alphaMax: 1,
      optCurve: true,
      optTolerance: 0.2,
      threshold: 128,
      blackOnWhite: true
    };
    this.init();
  }

  private init() {
    const uploadContainer = createElement('div', {
      class: 'image-uploader'
    });

    const input = createElement('input', {
      type: 'file',
      accept: 'image/*',
      class: 'image-uploader__input',
      id: 'image-upload'
    });

    const label = createElement('label', {
      for: 'image-upload',
      class: 'image-uploader__label'
    }, ['Upload Image']);

    const preview = createElement('div', {
      class: 'image-uploader__preview'
    });

    const optionsContainer = createElement('div', {
      class: 'image-uploader__options'
    });

    input.addEventListener('change', this.handleImageUpload.bind(this));

    uploadContainer.appendChild(input);
    uploadContainer.appendChild(label);
    uploadContainer.appendChild(optionsContainer);
    uploadContainer.appendChild(preview);
    this.container.appendChild(uploadContainer);

    // Initialize options panel
    new OptionsPanel(optionsContainer, this.options, (newOptions) => {
      console.log(newOptions);
      this.options = newOptions;
      this.updatePreview();
    });
  }

  private async handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
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
      this.onVectorGenerated(svg);
      
      const preview = this.container.querySelector('.image-uploader__preview');
      if (preview) {
        preview.innerHTML = svg;
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