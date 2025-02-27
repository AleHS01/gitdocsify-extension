import { createRoot } from "react-dom/client";
import { BaseStyles, Button, ThemeProvider } from "@primer/react";

function GitDocsifyButton() {
  return (
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <Button
          onClick={() => chrome.runtime.sendMessage({ action: "showAlert" })}
          sx={{
            backgroundColor: "#2ea44f",
            color: "white",
            fontSize: "14px",
            borderRadius: "6px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Generate Documentation
        </Button>
      </BaseStyles>
    </ThemeProvider>
  );
}

function injectButton() {
  const navBar = document.querySelector(
    'nav[aria-label="Repository files"] ul'
  );

  if (!navBar || document.getElementById("gitdocsify-button")) return;

  const li = document.createElement("li");
  li.id = "gitdocsify-button";

  const container = document.createElement("div");
  container.style.marginLeft = "10px";

  li.appendChild(container);
  navBar.appendChild(li);

  const root = createRoot(container);
  root.render(<GitDocsifyButton />);
}

injectButton();
document.addEventListener("pjax:end", injectButton);
