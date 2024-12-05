import type { PluginMessageEvent, PluginUIEvent } from './model.ts';


penpot.ui.open('Tracer', `?theme=${penpot.theme}`, {
    width: 292,
    height: 540,
});


penpot.ui.onMessage<PluginUIEvent>((message) => {
    if (message.type === 'insert-svg') {
        const { name, svg } = message.content;

        if (!svg || !name) {
            return;
        }

        const tracer = penpot.createShapeFromSvg(svg);
        if (tracer) {
            tracer.name = name;
            tracer.x = penpot.viewport.center.x;
            tracer.y = penpot.viewport.center.y;
        }
    }
});

penpot.on('themechange', (theme) => {
    sendMessage({ type: 'theme', content: theme });
});

function sendMessage(message: PluginMessageEvent) {
    penpot.ui.sendMessage(message);
}