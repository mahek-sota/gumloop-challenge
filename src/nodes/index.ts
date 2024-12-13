import type { NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Select News Category" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "Fetching News And Smmarising the News for you..." } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "News Displayed!" },
  },
];

export const nodeTypes = {
  // Add any of your custom nodes here!
} satisfies NodeTypes;
