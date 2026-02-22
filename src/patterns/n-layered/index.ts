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
  }
};

const layerBadges = {
  presentation: "L1",
  application: "L2",
  domain: "L3",
  infrastructure: "L4"
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
        subtitle: "(Use Cases, Services)",
        kind: "folder",
        icon: "app",
        layer: "application",
        description: "Use case orchestration layer.",
        resources: ["service", "usecase"],
        children: [
          {
            id: "application-service",
            name: "service",
            kind: "folder",
            icon: "package",
            layer: "application",
            description: "Application services.",
            resources: ["OrderService.java"],
            children: [
              {
                id: "order-service",
                name: "OrderService.java",
                kind: "file",
                icon: "java",
                layer: "application",
                description: "Orchestrates the CreateOrder use case.",
                resources: ["@Service", "transactions"]
              }
            ]
          },
          {
            id: "application-usecase",
            name: "usecase",
            kind: "folder",
            icon: "package",
            layer: "application",
            description: "Explicit use cases.",
            resources: ["CreateOrderUseCase.java"],
            children: [
              {
                id: "create-order-usecase",
                name: "CreateOrderUseCase.java",
                kind: "file",
                icon: "java",
                layer: "application",
                description: "Order creation use case.",
                resources: ["application logic"]
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
      }
    ]
  }
];

export const nLayeredPattern: PatternDefinition = {
  id: "n-layered",
  name: "N-Layered Architecture",
  tag: "Classic Layered",
  summary:
    "Horizontal layers in Java where each layer depends only on the one immediately below it.",
  pros: [
    "Traditional CRUD systems and small/medium backends.",
    "Teams requiring a quick-to-understand and maintainable structure."
  ],
  cons: [
    "Risk of anemic domain logic if growth is not controlled.",
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
      "application-service": true,
      "application-usecase": true,
      domain: true,
      "domain-model": true,
      "domain-repository": true,
      "domain-exception": true,
      infrastructure: true,
      "infra-persistence": true,
      "infra-config": true
    },
    layerBadges,
    layerMeta
  }
};
