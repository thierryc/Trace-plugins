export const createElement = (
  tag: string,
  props: Record<string, string> = {},
  children: (string | HTMLElement)[] = []
): HTMLElement => {
  const element = document.createElement(tag);
  
  Object.entries(props).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  
  return element;
};