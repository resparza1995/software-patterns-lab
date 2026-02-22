import type { PatternDefinition } from "../types";

export const edaPattern: PatternDefinition = {
  id: "eda",
  name: "Event-Driven Architecture",
  tag: "EDA",
  summary: "Decoupled communication through events and asynchronous processing.",
  pros: [
    "Distributed systems with integration across multiple contexts.",
    "High scalability and reactivity to real-time changes."
  ],
  cons: [
    "More complex debugging and distributed tracing.",
    "Eventual consistency challenges."
  ],
  nodes: ["Producer", "Topic/Queue", "Consumer A", "Consumer B", "Read Model"],
  flow: "Producer -> Event Bus -> Subscribers"
};
