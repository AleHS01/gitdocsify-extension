import React, { useEffect, useState } from "react";
import { TreeView } from "@primer/react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { RepoFile } from "../types/repository";
import { FileIcon } from "@primer/octicons-react";

type FileStructureTabProps = {
  branchName: string | undefined;
};

type Tree = {
  [key: string]: {
    children: Tree;
    type: "tree" | "blob";
  };
};

const FileStructureTab: React.FC<FileStructureTabProps> = ({ branchName }) => {
  const { name } = useParams();
  const [tree, setTree] = useState<Tree>({});
  const [currentFile, setCurrentFile] = useState<string>("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/github/repo/${name}/files/${branchName}`
        );
        buildTree(data.tree);
      } catch (error) {
        console.error(error);
      }
    };

    const buildTree = (fileTree: RepoFile[]) => {
      const root: Tree = {};

      fileTree.forEach(({ path, type }) => {
        const parts = path.split("/");
        let current = root;

        parts.forEach((part) => {
          if (!current[part]) {
            current[part] = {
              children: {},
              type: type,
            };
          }
          current = current[part].children;
        });
      });

      setTree(root);
    };

    fetchFiles();
  }, [name, branchName]);

  function renderTree(node: Tree, path = "") {
    return Object.keys(node)
      .sort((a, b) => {
        if (node[a].type === "tree" && node[b].type === "blob") return -1;
        if (node[a].type === "blob" && node[b].type === "tree") return 1;
        return a.localeCompare(b);
      })
      .map((key) => {
        const fullPath = path ? `${path}/${key}` : key;
        const item = node[key];

        return item.type === "tree" ? (
          <TreeView.Item
            key={fullPath}
            id={fullPath}
            current={currentFile === fullPath}
            onSelect={() => setCurrentFile(fullPath)}
          >
            <TreeView.LeadingVisual>
              <TreeView.DirectoryIcon />
            </TreeView.LeadingVisual>
            {key}
            <TreeView.SubTree>
              {renderTree(item.children, fullPath)}
            </TreeView.SubTree>
          </TreeView.Item>
        ) : (
          <TreeView.Item
            key={fullPath}
            id={fullPath}
            current={currentFile === fullPath}
            onSelect={() => setCurrentFile(fullPath)}
          >
            <TreeView.LeadingVisual>
              <FileIcon />
            </TreeView.LeadingVisual>
            {key}
          </TreeView.Item>
        );
      });
  }

  return <TreeView aria-label="Repository Files">{renderTree(tree)}</TreeView>;
};

export default FileStructureTab;
