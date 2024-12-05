export const coreStyles = {
  '--primary-color': '#646cff',
  '--secondary-color': '#535bf2',
  '--background-color': '#242424',
  '--text-color': '#ffffff',
  '--border-radius': '8px',
  '--spacing-unit': '8px',
  '--font-family': 'Inter, system-ui, sans-serif'
} as const;

export const applyStyles = (element: HTMLElement, styles: Partial<typeof coreStyles>) => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
};