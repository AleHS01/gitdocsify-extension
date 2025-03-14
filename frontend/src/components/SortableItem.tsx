import { useSortable } from "@dnd-kit/sortable";
import { Box, Button } from "@primer/react";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, name, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 2,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border.muted",
        borderRadius: 2,
        bg: "canvas.subtle",
        cursor: "grab",
        userSelect: "none",
        ...style,
      }}
      {...attributes}
      {...listeners}
    >
      <span>{name}</span>
      <Button
        variant="invisible"
        sx={{ color: "danger.fg" }}
        onClick={() => onRemove(name)}
      >
        ✕
      </Button>
    </Box>
  );
};

export default SortableItem;
