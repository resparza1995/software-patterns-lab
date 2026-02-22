import type { PatternDefinition } from "../types";

export const cqrsPattern: PatternDefinition = {
  id: "cqrs",
  name: "CQRS",
  tag: "Command/Query Separation",
  summary: "Separates the write model (commands) from the read model (queries) to optimize both.",
  pros: [
    "Scenarios with very different read/write behavior and throughput.",
    "Allows independent scaling of read and write sides."
  ],
  cons: [
    "Higher conceptual complexity.",
    "Data consistency challenges between write and read models."
  ],
  nodes: ["Command API", "Write Model", "Event Store", "Read Model", "Query API"],
  flow: "Command -> Write -> Events -> Read Projection -> Query"
};
