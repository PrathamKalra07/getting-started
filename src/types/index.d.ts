interface W3Color {
  toRgb: () => { r: number; b: number; g: number; a: number };
}

declare interface Window {
  w3color: (
    color: Record<string, unknown> | string,
    element?: HTMLElement
  ) => W3Color;
}

type AttachmentType = "image" | "text" | "drawing" | "signature";

interface AttachmentBase {
  id: () => number;
  width: number;
  height: number;
  x: number;
  y: number;
  type: AttachmentType;
}

//
interface SignatureAttachment extends AttachmentBase {}
//

interface ImageAttachment extends AttachmentBase {
  file: File;
  img: HTMLImageElement;
  encodedImgData?: any;
}

interface DrawingAttachment extends AttachmentBase {
  path?: string;
  scale?: number;
  stroke?: string;
  strokeWidth?: number;
}

interface TextAttachment extends AttachmentBase {
  text?: string;
  fontFamily?: string;
  size?: number;
  lineHeight?: number;
  lines?: string[];
}

interface Dimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

type Attachment =
  | ImageAttachment
  | DrawingAttachment
  | TextAttachment
  | SignatureAttachment;

type Attachments = Attachment[];

type DragEventListener<T> = (e: React.MouseEvent<T>) => void;

interface SignatureObject {
  id: number;
  data: string;
}
