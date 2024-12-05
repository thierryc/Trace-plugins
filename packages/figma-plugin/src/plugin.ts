
if (figma.editorType === 'figma') {
  figma.showUI(__html__);
  figma.ui.onmessage = (msg: { type: string, svg: string }) => {

    console.log(msg.type);

    if (msg.type === 'create-vector') {
      // Create a vector node from the SVG string
      const vectorNode = figma.createNodeFromSvg(msg.svg);

      console.log(msg.svg);
      
      // Add the vector node to the current page
      figma.currentPage.appendChild(vectorNode);
      
      // Select the newly created vector node
      const nodes: SceneNode[] = [vectorNode];
      figma.currentPage.selection = nodes;

      // Scroll and zoom into view of the new node
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    figma.closePlugin();
  };
}