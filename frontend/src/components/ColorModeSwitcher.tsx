import { useTheme, ActionMenu, ActionList, Box } from "@primer/react";
import { SunIcon, MoonIcon } from "@primer/octicons-react";
import { useEffect } from "react";

interface Scheme {
  name: string;
  value: string;
  icon: React.ComponentType;
}

function ColorModeSwitcher() {
  const { setDayScheme, setNightScheme, colorScheme } = useTheme();

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setDayScheme(initialTheme);
    setNightScheme(initialTheme);
    localStorage.setItem("theme", initialTheme);
  }, [setDayScheme, setNightScheme]);

  const schemes: Scheme[] = [
    {
      name: "Light",
      value: "light",
      icon: SunIcon,
    },
    {
      name: "Dark",
      value: "dark",
      icon: MoonIcon,
    },
  ];

  const current = schemes.find((scheme) => scheme.value === colorScheme);

  if (!current) {
    return null;
  }

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ActionMenu>
          <ActionMenu.Button size="small">
            <current.icon />
            <Box sx={{ display: "inline-block", ml: 2 }}>{current.name}</Box>
          </ActionMenu.Button>
          <ActionMenu.Overlay>
            <ActionList showDividers>
              <ActionList.Group selectionVariant="single">
                {schemes.map((scheme) => (
                  <ActionList.Item
                    key={scheme.value}
                    selected={scheme.value === colorScheme}
                    onSelect={() => {
                      setDayScheme(scheme.value);
                      setNightScheme(scheme.value);
                      localStorage.setItem("theme", scheme.value);
                    }}
                  >
                    {scheme.name}
                  </ActionList.Item>
                ))}
              </ActionList.Group>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </Box>
    </Box>
  );
}

export default ColorModeSwitcher;
