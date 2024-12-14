

if (figma.editorType === 'figma') {
  figma.showUI(__html__, {
    height: 500,
    themeColors: true,
  });

  figma.ui.onmessage = (msg: { type: string, svg: string, options: {} }) => {
    if (msg.type === 'create-vector') {
      // Create a vector node from the SVG string
      const vectorNode = figma.createNodeFromSvg(msg.svg);
      vectorNode.name = JSON.stringify(msg.options);

      // Add the vector node to the current page
      figma.currentPage.appendChild(vectorNode);

      // Place the vector node in the center of the current viewport
      const { x, y } = figma.viewport.center;
      vectorNode.x = x - vectorNode.width / 2;
      vectorNode.y = y - vectorNode.height / 2;

      // Select the newly created vector node
      const nodes: SceneNode[] = [vectorNode];
      figma.currentPage.selection = nodes;

      // Scroll and zoom into view of the new node
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    // figma.closePlugin();
  };
}