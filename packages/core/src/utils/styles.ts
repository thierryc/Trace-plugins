import { cssVariables } from '../styles/variables';

export const applyStyles = (element: HTMLElement): void => {
  Object.entries({ ...cssVariables.colors, ...cssVariables.spacing, ...cssVariables.typography })
    .forEach(([key, value]) => {
      element.style.setProperty(key, value);
    });
};