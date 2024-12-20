import { ImageUploader } from '@ap.cx/tracer-core';

const container = document.getElementById('app')!;
container.innerHTML = `
  <div class="plugin-container">
    <h2>Convert Image to Vector</h2>
    <div id="image-upload-container"></div>
  </div>
`;

new ImageUploader('image-upload-container', (svg) => {
  window.postMessage('sketchPlugin', { type: 'create-vector', svg });
});