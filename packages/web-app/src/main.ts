import { coreStyles, applyStyles, ImageUploader } from '@ap.cx/tracer-core';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

// Apply core styles
applyStyles(document.documentElement, coreStyles);

app.innerHTML = `
  <div class="container">
    <h1>Design Tools Web App</h1>
    <div class="canvas">
      <div class="toolbar">
        <button id="rectangle">Rectangle</button>
        <button id="circle">Circle</button>
        <button id="text">Text</button>
      </div>
      <div id="image-upload-container"></div>
      <div id="design-canvas"></div>
    </div>
  </div>
`;

// Initialize image uploader
new ImageUploader('image-upload-container', (svg) => {
  console.log('Vector generated:', svg);
  // Handle the generated SVG
});