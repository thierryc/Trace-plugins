
import type { PluginUIEvent } from './model.ts';
import { ImageUploader } from '@ap.cx/tracer-core';

const container = document.getElementById('app')!;
container.innerHTML = `
  <div class="plugin-container">
    <div id="image-upload-container"></div>
  </div>
`;

new ImageUploader('image-upload-container', (svg) => {
  console.log(svg);
  
  // Integrate with Penpot's API
  sendMessage({
    type: 'insert-svg',
    content: {
      svg,
      name: 'trace',
    },
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  // Get the 'theme' parameter from the URL
  const theme = urlParams.get('theme');
  if (theme) {
    setTheme(theme);
  }
});

// Function to set the data-theme attribute on the body
function setTheme(theme: string): void {
  document.body.setAttribute('data-theme', theme);
}

window.addEventListener("message", (event) => {
  if (event.data.type === 'theme') {
    setTheme(event.data.content);
  }
});


function sendMessage(message: PluginUIEvent) {
  parent.postMessage(message, '*');
}