import { ImageUploader } from '@ap.cx/tracer-core';

const container = document.getElementById('app')!;
container.innerHTML = `
  <div class="plugin-container">
    <div id="image-upload-container"></div>
  </div>
`;

new ImageUploader('image-upload-container', (svg, options) => {
  parent.postMessage({ pluginMessage: { type: 'create-vector', svg, options } }, '*');
});