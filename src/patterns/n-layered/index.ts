import type { ProjectTreeNode } from "../../components/ProjectTreeExplorer";
import type { PatternDefinition } from "../types";

const layerMeta = {
  presentation: {
    title: "Layer 01 - Presentation",
    goal: "System Input & Output (HTTP/REST/UI)",
    objective: "Controllers and DTOs without business logic."
  },
  application: {
    title: "Layer 02 - Application",
    goal: "Orchestrate Use Cases",
    objective: "Application services, transactions, and coordination."
  },
  domain: {
    title: "Layer 03 - Domain",
    goal: "Pure Business Rules",
    objective: "Entities, repository interfaces, and domain exceptions."
  },
  infrastructure: {
    title: "Layer 04 - Infrastructure",
    goal: "Technical Details",
    objective: "JPA/Hibernate persistence, SQL, and configuration."
  },
  common: {
    title: "Shared Kernel / Common",
    goal: "Cross-Cutting Concerns",
    objective: "Logging, Security, and shared utilities used by all layers."
  }
};

const layerBadges = {
  presentation: "L1",
  application: "L2",
  domain: "L3",
  infrastructure: "L4",
  common: "SK"
};

const nLayeredTree: ProjectTreeNode[] = [
  {
    id: "root",
    name: "com.example.shop",
    kind: "folder",
    icon: "root",
    description: "Root package for the N-Layered Java example.",
    resources: ["N-Layered Java", "downward dependencies"],
    children: [
      {
        id: "presentation",
        name: "presentation",
        subtitle: "(UI, Controllers)",
        kind: "folder",
        icon: "api",
        layer: "presentation",
        description: "Entry/Exit layer (REST).",
        resources: ["controller", "dto"],
        children: [
          {
            id: "presentation-controller",
            name: "controller",
            kind: "folder",
            icon: "package",
            layer: "presentation",
            description: "HTTP Endpoints.",
            resources: ["OrderController.java"],
            children: [
              {
                id: "order-controller",
                name: "OrderController.java",
                kind: "file",
                icon: "java",
                layer: "presentation",
                description: "Receives requests and delegates to Application.",
                resources: ["@RestController", "@PostMapping"]
              }
            ]
          },
          {
            id: "presentation-dto",
            name: "dto",
            kind: "folder",
            icon: "package",
            layer: "presentation",
            description: "Input/Output contracts.",
            resources: ["CreateOrderRequest.java"],
            children: [
              {
                id: "create-order-request",
                name: "CreateOrderRequest.java",
                kind: "file",
                icon: "java",
                layer: "presentation",
                description: "Order creation DTO.",
                resources: ["request model"]
              }
            ]
          }
        ]
      },
      {
        id: "application",
        name: "application",
        subtitle: "(Use Cases)",
        kind: "folder",
        icon: "app",
        layer: "application",
        description: "Orchestrates business use cases without technical logic.",
        resources: ["usecase"],
        children: [
          {
            id: "application-usecase",
            name: "usecase",
            kind: "folder",
            icon: "package",
            layer: "application",
            description: "Explicit use case implementation.",
            resources: ["CreateOrderUseCase.java"],
            children: [
              {
                id: "create-order-usecase",
                name: "CreateOrderUseCase.java",
                kind: "file",
                icon: "java",
                layer: "application",
                description: "Coordinates domain entities and infrastructure.",
                resources: ["@Service", "transactions"]
              }
            ]
          }
        ]
      },
      {
        id: "domain",
        name: "domain",
        subtitle: "(Entities, Value Objects)",
        kind: "folder",
        icon: "domain",
        layer: "domain",
        description: "Pure business rules, framework-free.",
        resources: ["model", "repository", "exception"],
        children: [
          {
            id: "domain-model",
            name: "model",
            kind: "folder",
            icon: "package",
            layer: "domain",
            description: "Domain entities and objects.",
            resources: ["Order.java"],
            children: [
              {
                id: "order-domain",
                name: "Order.java",
                kind: "file",
                icon: "java",
                layer: "domain",
                description: "Entity with invariant validation.",
                resources: ["quantity > 0"]
              }
            ]
          },
          {
            id: "domain-repository",
            name: "repository",
            kind: "folder",
            icon: "package",
            layer: "domain",
            description: "Domain persistence contracts.",
            resources: ["OrderRepository.java"],
            children: [
              {
                id: "order-repository",
                name: "OrderRepository.java",
                kind: "file",
                icon: "java",
                layer: "domain",
                description: "Repository interface.",
                resources: ["save(Order)"]
              }
            ]
          },
          {
            id: "domain-exception",
            name: "exception",
            kind: "folder",
            icon: "package",
            layer: "domain",
            description: "Domain errors.",
            resources: ["OrderException.java"],
            children: [
              {
                id: "order-exception",
                name: "OrderException.java",
                kind: "file",
                icon: "java",
                layer: "domain",
                description: "Order domain specific exception.",
                resources: ["business exception"]
              }
            ]
          }
        ]
      },
      {
        id: "infrastructure",
        name: "infrastructure",
        subtitle: "(DB, External APIs)",
        kind: "folder",
        icon: "infra",
        layer: "infrastructure",
        description: "Technical implementations and configuration.",
        resources: ["persistence", "config"],
        children: [
          {
            id: "infra-persistence",
            name: "persistence",
            kind: "folder",
            icon: "package",
            layer: "infrastructure",
            description: "JPA persistence adapters.",
            resources: ["JpaOrderRepository.java", "OrderEntity.java"],
            children: [
              {
                id: "jpa-order-repository",
                name: "JpaOrderRepository.java",
                kind: "file",
                icon: "java",
                layer: "infrastructure",
                description: "JPA implementation of OrderRepository.",
                resources: ["@Repository", "SpringDataOrderRepository"]
              },
              {
                id: "order-entity",
                name: "OrderEntity.java",
                kind: "file",
                icon: "java",
                layer: "infrastructure",
                description: "ORM entity for persistence.",
                resources: ["JPA entity"]
              }
            ]
          },
          {
            id: "infra-config",
            name: "config",
            kind: "folder",
            icon: "package",
            layer: "infrastructure",
            description: "Technical configuration.",
            resources: ["PersistenceConfig.java"],
            children: [
              {
                id: "persistence-config",
                name: "PersistenceConfig.java",
                kind: "file",
                icon: "java",
                layer: "infrastructure",
                description: "Persistence layer configuration.",
                resources: ["beans", "datasource"]
              }
            ]
          }
        ]
      },
      {
        id: "common",
        name: "common",
        subtitle: "(Shared Kernel)",
        kind: "folder",
        icon: "package",
        layer: "common",
        description: "Cross-cutting concerns and global utilities.",
        resources: ["logging", "security", "exception"],
        children: [
          {
            id: "common-logging",
            name: "logging",
            kind: "folder",
            icon: "package",
            layer: "common",
            description: "Custom logging aspect.",
            resources: ["LogAspect.java"],
            children: [
              {
                id: "log-aspect",
                name: "LogAspect.java",
                kind: "file",
                icon: "java",
                layer: "common",
                description: "AOP logging for all layers.",
                resources: ["@Aspect"]
              }
            ]
          },
          {
            id: "common-exception",
            name: "exception",
            kind: "folder",
            icon: "package",
            layer: "common",
            description: "Global exception handling.",
            resources: ["GlobalExceptionHandler.java"],
            children: [
              {
                id: "global-handler",
                name: "GlobalExceptionHandler.java",
                kind: "file",
                icon: "java",
                layer: "common",
                description: "Maps internal errors to API responses.",
                resources: ["@ControllerAdvice"]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const nLayeredPattern: PatternDefinition = {
  id: "n-layered",
  name: "N-Layered Architecture",
  tag: "Classic Layered",
  summary:
    "A modern Domain-Driven approach to layering where the Domain Core is protected and dependencies flow towards it or downwards.",
  pros: [
    "Traditional CRUD systems and small/medium backends.",
    "Teams requiring a quick-to-understand and maintainable structure."
  ],
  cons: [
    "Risk of weak domain logic if growth is not controlled.",
    "High coupling if upper layers bypass levels unnecessarily."
  ],
  nodes: ["Presentation", "Application", "Domain", "Infrastructure"],
  flow: "Presentation -> Application -> Domain | Infrastructure -> Domain",
  treeView: {
    title: "COM.EXAMPLE.SHOP",
    nodes: nLayeredTree,
    initialSelectedNodeId: "domain",
    initialExpanded: {
      root: true,
      presentation: true,
      "presentation-controller": true,
      "presentation-dto": true,
      application: true,
      "application-usecase": true,
      domain: true,
      "domain-model": true,
      "domain-repository": true,
      "domain-exception": true,
      infrastructure: true,
      "infra-persistence": true,
      "infra-config": true,
      common: true
    },
    layerBadges,
    layerMeta
  },
  diagram: {
    type: "layered",
    layers: [
      { id: "presentation", name: "Presentation", description: "UI & Controllers" },
      { id: "application", name: "Application", description: "Explicit Use Cases" },
      { id: "domain", name: "Domain", description: "The Pure Business Heart" },
      { id: "infrastructure", name: "Infrastructure", description: "Technical Details" },
      { id: "common", name: "Common", description: "Cross-Cutting Kernel" }
    ],
    connections: [
      { from: "presentation", to: "application" },
      { from: "application", to: "domain" },
      { from: "infrastructure", to: "domain" },
      { from: "presentation", to: "common" },
      { from: "application", to: "common" },
      { from: "infrastructure", to: "common" },
      { from: "domain", to: "common" }
    ]
  },
  dependencies: {
    layers: ["Presentation", "Application", "Domain", "Infrastructure", "Common"],
    rules: [
      { from: "Presentation", to: "Application", status: "allowed", reason: "Standard downward flow." },
      { from: "Application", to: "Domain", status: "allowed", reason: "Use Cases orchestrate Entities." },
      { from: "Infrastructure", to: "Domain", status: "allowed", reason: "Dependency Inversion: Adapters implement Core ports." },
      { from: "*", to: "Common", status: "allowed", reason: "The shared kernel is accessible globally." },
      { from: "Domain", to: "Presentation", status: "forbidden", reason: "Business logic must not know about UI." },
      { from: "Domain", to: "Infrastructure", status: "forbidden", reason: "Business logic must be framework-free." },
      { from: "Presentation", to: "Infrastructure", status: "forbidden", reason: "Should skip layers unnecessarily." }
    ]
  }
};
