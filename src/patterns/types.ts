import type {
  ProjectTreeLayerMeta,
  ProjectTreeNode
} from "../components/ProjectTreeExplorer";

export type PatternId = "n-layered" | "hexagonal" | "microservices" | "eda" | "cqrs" | "vertical-slices";

export type PatternDefinition = {
  id: PatternId;
  name: string;
  tag: string;
  summary: string;
  pros: string[]; // Changed from idealFor
  cons: string[]; // Changed from tradeoffs
  nodes: string[];
  flow: string;
  treeView?: {
    title: string;
    nodes: ProjectTreeNode[];
    initialSelectedNodeId: string;
    initialExpanded: Record<string, boolean>;
    layerBadges?: Record<string, string>;
    layerMeta?: Record<string, ProjectTreeLayerMeta>;
  };
  diagram?: {
    type: "layered" | "hexagonal" | "mesh";
    layers: Array<{
      id: string;
      name: string;
      description: string;
    }>;
    connections: Array<{
      from: string;
      to: string;
    }>;
  };
  dependencies?: {
    layers: string[];
    rules: Array<{
      from: string;
      to: string;
      status: "allowed" | "forbidden";
      reason?: string;
    }>;
  };
};
