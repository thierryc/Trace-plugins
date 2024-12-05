export const uploaderStyles = `
.image-uploader {
  border: 2px dashed var(--color-border);
  border-radius: var(--spacing-sm);
  padding: var(--spacing-md);
  text-align: center;
  margin: var(--spacing-md) 0;
}

.image-uploader__input {
  display: none;
}

.image-uploader__label {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: var(--spacing-xs);
  cursor: pointer;
  transition: background-color 0.3s;
}

.image-uploader__label:hover {
  background-color: var(--color-secondary);
}

.image-uploader__preview {
  margin-top: var(--spacing-md);
  max-width: 100%;
  min-height: 100px;
}

.image-uploader__preview svg {
  max-width: 100%;
  height: auto;
}

/* Options Panel Styles */
.options-panel {
  background: var(--color-background);
  border-radius: var(--spacing-sm);
  padding: var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.options-group {
  margin-bottom: var(--spacing-md);
}

.options-title {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.options-select {
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--spacing-xs);
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.options-color {
  width: 100%;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: var(--spacing-xs);
}

.range-container {
  margin-bottom: var(--spacing-sm);
}

.range-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.range-input {
  width: 100%;
  margin: var(--spacing-xs) 0;
}

.range-value {
  display: inline-block;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin-left: var(--spacing-xs);
}`;