// Import types
import type { PluginMessageEvent, PluginUIEvent } from './model.ts';
import type { Penpot } from '@penpot/plugin-types';

// Declare the Penpot global (if Penpot is global in your environment)
declare const penpot: Penpot;

// Open the Penpot UI with specified parameters
penpot.ui.open('Tracer', `?theme=${penpot.theme}`, {
    width: 292,
    height: 540,
});

// Listen for messages from the UI
penpot.ui.onMessage<PluginUIEvent>((message) => {
    if (message.type === 'insert-svg') {
        const { name, svg } = message.content;

        // Ensure both `svg` and `name` exist
        if (!svg || !name) {
            console.error('Invalid SVG or name received in insert-svg event');
            return;
        }

        // Create a shape from the SVG
        const tracer = penpot.createShapeFromSvg(svg);
        if (tracer) {
            tracer.name = name;
            tracer.x = penpot.viewport.center.x;
            tracer.y = penpot.viewport.center.y;
        } else {
            console.error('Failed to create shape from SVG');
        }
    }
});

// Listen for theme changes
penpot.on('themechange', (theme: string) => {
    sendMessage({ type: 'theme', content: theme });
});

// Helper function to send messages
function sendMessage(message: PluginMessageEvent): void {
    penpot.ui.sendMessage(message);
}