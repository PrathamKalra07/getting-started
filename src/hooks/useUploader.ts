import React, { useState, createRef } from "react";
import { readAsPDF, readAsDataURL, readAsImage } from "../utils/asyncReader";
import { Pdf } from "./usePdf";
import { Attachment } from "../types";

type ActionEvent<T> = React.TouchEvent<T> | React.MouseEvent<T>;

export enum UploadTypes {
  PDF = "pdf",
  IMAGE = "image",
}

const handlers = {
  pdf: async (file: File) => {
    try {
      const pdf = await readAsPDF(file);
      return {
        file,
        name: file.name,
        pages: Array(pdf.numPages)
          .fill(0)
          .map((_, index) => pdf.getPage(index + 1)),
      } as Pdf;
    } catch (error) {
      console.log("Failed to load pdf", error);
      throw new Error("Failed to load PDF");
    }
  },
};

/**
 * @function useUploader
 *
 * @description This hook handles pdf and image uploads
 *
 * @
 * @param use UploadTypes
 */
export const useUploader = ({
  use,
  afterUploadPdf,
  afterUploadAttachment,
}: {
  use: UploadTypes;
  afterUploadPdf?: (upload: Pdf) => void;
  afterUploadAttachment?: (upload: Attachment) => void;
}) => {
  const [isUploading, setIsUploading] = useState(true);
  // const [isUploading, setIsUploading] = useState(false);
  const inputRef = createRef<HTMLInputElement>();

  const onClick = (event: ActionEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };

  const handleClick = () => {
    const input = inputRef.current;

    if (input) {
      setIsUploading(true);
      input.click();
    }
  };

  const upload = async (uuid?: any, uuidTemplateInstance?: any) => {
    if (!isUploading) {
      return;
    }
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/fetchpdf?uuid=${uuid}&tiUUID=${uuidTemplateInstance}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        },
      }
    );

    let dataBlob = await response.blob();
    // ###################

    const f: File = new File([dataBlob], "mypdf.pdf", {
      type: "application/pdf",
    });

    const file = f;

    const result = await handlers[use](file);

    if (use === UploadTypes.PDF && afterUploadPdf) {
      afterUploadPdf(result as Pdf);
    }

    if (use === UploadTypes.IMAGE && afterUploadAttachment) {
      console.log("===> was this also called");
      afterUploadAttachment(result);
    }
    setIsUploading(false);
    return;
  };

  return {
    upload,
    onClick,
    inputRef,
    isUploading,
    handleClick,
  };
};
