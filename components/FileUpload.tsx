"use client";

import { useEdgeStore } from "@/utils/edgestore";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

interface FileUploadProps {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FileUpload({ setUrl, setIsLoading }: FileUploadProps) {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  const uploadFile = async (file: File) => {
    if (file) {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-5">
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
    </div>
  );
}
