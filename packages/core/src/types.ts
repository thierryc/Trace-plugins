export interface PluginMessage {
  type: string;
  payload: unknown;
}

export interface DesignElement {
  id: string;
  type: 'rectangle' | 'circle' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}