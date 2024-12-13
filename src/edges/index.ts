import type { Edge, EdgeTypes } from "@xyflow/react";

export const initialEdges: Edge[] = []; // Start with no edges initially

export const edgeTypes = {
  // Placeholder for custom edge types
} satisfies EdgeTypes;

// Utility function to create dynamic edges
export const createDynamicEdge = (
  id: string,
  source: string,
  target: string,
  color: string = "blue"
): Edge => ({
  id,
  source,
  target,
  animated: true,
  type: "smoothstep",
  style: { stroke: color },
});
