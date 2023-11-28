"use client";

import { useEdgeStore } from "@/utils/edgestore";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface FileUploadProps {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

export default function FileUpload({
  type = "Post",
  setUrl,
  setIsUploading,
}: FileUploadProps) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [showInput, setShowInput] = useState<boolean>(false);
  const uploadFile = async (file: File) => {
    if (file) {
      setIsUploading(true);
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          temporary: true,
        },
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress);
        },
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      setUrl(res.url);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex gap-5">
      {type == "Edit" && !showInput ? (
        <Button
          type="button"
          onClick={() => {
            setShowInput(true);
          }}>
          Upload New Image
        </Button>
      ) : (
        <Input
          required
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
            if (e.target.files?.[0]) {
              uploadFile(e.target.files?.[0]);
            }
          }}
        />
      )}
    </div>
  );
}
