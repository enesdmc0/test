"use client";

import {createTheme, MantineColorsTuple} from "@mantine/core";

const gray: MantineColorsTuple = [
     "#F8F9FA",
     "#F1F3F5",
     "#E9ECEF",
     "#DEE2E6",
     "#CED4DA",
     "#ADB5BD",
     "#868E96",
     "#495057",
     "#343A40",
     "#212529",
]

export const theme = createTheme({
  colors: {
      gray
  }
});
