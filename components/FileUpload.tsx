"use client";
import { useEdgeStore } from "@/utils/edgestore";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

export default function FileUpload() {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();
  return (
    <div className="flex gap-5">
      <Input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <Button
        type="button"
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
          }
        }}>
        Upload
      </Button>
    </div>
  );
}
