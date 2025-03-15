import {
  Button,
  Dialog,
  TextInput,
  Box,
  Text,
  Textarea,
  Stack,
  FormControl,
} from "@primer/react";
import React, { useState, useRef, useCallback } from "react";
import { LightBulbIcon } from "@primer/octicons-react";
import { Section } from "../types/section";

type SectionDialogBoxProps = {
  onDialogSubmit: (section: Section) => void;
};

const SectionDialogBox: React.FC<SectionDialogBoxProps> = ({
  onDialogSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onDialogClose = useCallback(() => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setError("");
  }, []);

  const handleSubmit = () => {
    if (!title.trim() || title.length < 3) {
      setError("Title must be at least 3 characters long.");
      return;
    }
    if (description.length < 50) {
      setError("Description must be at least 50 characters long.");
      return;
    }
    setError("");
    onDialogSubmit({
      name: title,
      description,
      id: title.toLowerCase().replace(/\s+/g, "-"),
      icon: LightBulbIcon,
    });
    setIsOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <Button
        ref={buttonRef}
        leadingVisual={LightBulbIcon}
        onClick={() => setIsOpen(!isOpen)}
        sx={{ width: "100%" }}
      >
        Add Custom Section
      </Button>

      {isOpen && (
        <Dialog onDismiss={onDialogClose} isOpen={isOpen} position="right">
          <Dialog.Header>Add Custom Section</Dialog.Header>
          <Stack as="form" direction="vertical" gap="normal">
            <Box
              sx={{
                px: 3,
                py: 1,
              }}
            >
              <FormControl.Label sx={{ mb: 1 }}>
                Enter Section Title
              </FormControl.Label>
              <TextInput
                sx={{ width: "100%" }}
                placeholder="Enter section title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                px: 3,
                py: 1,
              }}
            >
              <FormControl.Label sx={{ mb: 1 }}>
                Enter Section Description
              </FormControl.Label>
              <Textarea
                sx={{ width: "100%" }}
                placeholder="Enter section description (min. 50 characters)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                minLength={50}
              />
            </Box>

            {error && (
              <Box
                sx={{
                  color: "#d1242f",
                  textAlign: "center",
                }}
              >
                <Text>{error}</Text>
              </Box>
            )}
          </Stack>
          <Box
            sx={{
              borderTopWidth: 1,
              borderTopStyle: "solid",
              borderColor: "border.default",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              py: 3,
              mt: 2,
            }}
          >
            <Button variant="primary" onClick={handleSubmit}>
              Add Section
            </Button>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default SectionDialogBox;
