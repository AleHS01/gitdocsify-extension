import {
  GearIcon,
  TerminalIcon,
  BookIcon,
  LawIcon,
  GraphIcon,
  InfoIcon,
  ShieldLockIcon,
  ToolsIcon,
  ChecklistIcon,
  RocketIcon,
  PencilIcon,
  LockIcon,
  FileDirectoryIcon,
} from "@primer/octicons-react";

export const sectionOptions = [
  {
    name: "Introduction",
    icon: InfoIcon,
    id: "introduction",
    description: "Overview of the project, its purpose, and key features.",
  },
  {
    name: "Setup",
    icon: GearIcon,
    id: "setup",
    description: "Instructions on how to install and configure the project.",
  },
  {
    name: "Usage",
    icon: GraphIcon,
    id: "usage",
    description: "Details on how to use the project, with examples.",
  },
  {
    name: "API",
    icon: TerminalIcon,
    id: "api",
    description:
      "Comprehensive list of API endpoints, methods, and parameters.",
  },
  {
    name: "Table of Content",
    icon: BookIcon,
    id: "table-of-content",
    description: "A structured list of all sections in the documentation.",
  },
  {
    name: "License",
    icon: LawIcon,
    id: "license",
    description:
      "Legal information about the project's usage and distribution.",
  },
  {
    name: "Getting Started",
    icon: RocketIcon,
    id: "getting-started",
    description: "Quick start guide for new users.",
  },
  {
    name: "Security",
    icon: ShieldLockIcon,
    id: "security",
    description: "Security guidelines, vulnerabilities, and best practices.",
  },
  {
    name: "Contributing",
    icon: ToolsIcon,
    id: "contributing",
    description:
      "How to contribute to the project (e.g., PR guidelines, issues).",
  },
  {
    name: "Deployment",
    icon: RocketIcon,
    id: "deployment",
    description: "Guide on deploying the project to production.",
  },
  {
    name: "Testing",
    icon: ChecklistIcon,
    id: "testing",
    description: "Testing strategies, unit tests, and integration tests.",
  },
  {
    name: "Customization",
    icon: PencilIcon,
    id: "customization",
    description: "How to customize the project for different needs.",
  },
  {
    name: "Authentication",
    icon: LockIcon,
    id: "authentication",
    description:
      "Details on authentication methods, user roles, and security best practices.",
  },
  {
    name: "File Structure",
    icon: FileDirectoryIcon,
    id: "file-structure",
    description:
      "Overview of the project's directory structure and organization.",
  },
];
