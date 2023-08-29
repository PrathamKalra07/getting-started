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

interface SignatureObject {
  id: number;
  data: string;
}

export interface coord {}

export interface Signatory {
  signatoryUUID: string;
  signatoryName: string;
  coordData: coord[];
}

export interface selectOption {
  label: string;
  value: number;
}
