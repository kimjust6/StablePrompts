"use client";

import { Button } from "@/components/ui/button";
import { getStableDiffusionImage } from "@/utils/getImage";
import React from "react";

const page = () => {
  return (
    <section>
      <Button
        variant="default"
        onClick={() => {
          getStableDiffusionImage("Pizza");
        }}>
        Submit
      </Button>
    </section>
  );
};

export default page;
