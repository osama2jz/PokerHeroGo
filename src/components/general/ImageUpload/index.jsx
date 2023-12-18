import { ActionIcon, Box, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
// import { AttachFile, Cancel } from "@mui/icons-material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Paperclip, X } from "tabler-icons-react";
import imageCompression from "browser-image-compression";
export default function ImageUpload({ form, name = "coverImage" }) {
  const isMobile = useMediaQuery("(max-width: 820px)");

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const options = {
        useWebWorker: true,
        maxHeight: 384,
        maxWidth: 770,
        maxWidthOrHeight: 770,
        maxSizeMB: 0.6,
      };
      const newFile = await imageCompression(file, options);
      newFile.preview = URL.createObjectURL(newFile);
      form.setFieldValue(name, newFile);
    },
  });
  return (
    <>
      <Text fw="600"> Cover Image</Text>
      <Box
        style={{
          position: "relative",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: form.values[name] == null ? 5 : 0,
          overflow: "hidden",
          borderWidth: "2px",
          borderStyle: "dashed",
          borderColor: isDragAccept
            ? "green"
            : isDragReject || form.errors[name]
            ? "red"
            : "gray",
          borderRadius: 16,
          width: "min(100%, 220px)",
          height: 220,
          outline: "none",
          transition: "border .24s ease-in-out",
          mx: "auto",
          textAlign: "center",
          "&:hover": {
            borderColor: "green",
          },
        }}
        {...getRootProps()}
      >
        {form.values[name] == null ? (
          <>
            <input
              {...getInputProps()}
              capture="environment"
              onChange={(e) => {
                const file = e.target.files[0];
                file.preview = URL.createObjectURL(file);
                form.setFieldValue(name, file);
              }}
            />

            <Paperclip size={"25%"} />
            {isDragActive ? (
              <Text fz="sm" mt="sm">
                Drop the file here ...
              </Text>
            ) : (
              <Text fz="sm" mt="sm">
                Drag and drop a file
                <br />
                or click to select a file
                <br />
                <Text c="gray" size="xs">
                  (Preferred Dimensions : 770x384)
                </Text>
              </Text>
            )}
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <img
              src={form.values[name].preview || form.values[name]}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <ActionIcon
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                color: "white",
                padding: 3,
                borderRadius: "50%",
              }}
              onClick={(e) => {
                e.stopPropagation();
                form.setFieldValue(name, null);
              }}
            >
              <X />
            </ActionIcon>
          </Box>
        )}
        {form?.errors?.[name] && (
          <Text color="red" mt={10} size={isMobile ? "xs" : "sm"}>
            {form?.errors?.[name]}
          </Text>
        )}
      </Box>
    </>
  );
}
