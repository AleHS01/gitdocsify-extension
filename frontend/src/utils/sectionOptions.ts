import {
  GearIcon,
  QuestionIcon,
  LogIcon,
  TerminalIcon,
  BookIcon,
  LawIcon,
  GraphIcon,
  InfoIcon,
} from "@primer/octicons-react";

export const sectionOptions = [
  { name: "Introduction", icon: InfoIcon, id: "introduction" },
  { name: "Setup", icon: GearIcon, id: "setup" },
  { name: "Usage", icon: GraphIcon, id: "usage" },
  { name: "API", icon: TerminalIcon, id: "api" },
  { name: "Table of Content", icon: BookIcon, id: "table-of-content" },
  { name: "FAQ", icon: QuestionIcon, id: "faq" },
  { name: "Changelog", icon: LogIcon, id: "changelog" },
  { name: "License", icon: LawIcon, id: "license" },
];
