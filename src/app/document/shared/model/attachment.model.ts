import { sizeValues, AttachmentSizeType } from "../attachmet-size-type";

export interface Attachment {
  id?: number;
  name: string;
  data: [];
  width: number;
  height: number;
}

export const emptyAttachment = (): Attachment => {
  const meduimSize = sizeValues(AttachmentSizeType.MEDUIM);
  return {
    id: null,
    name: '',
    data: [],
    width: meduimSize.width,
    height: meduimSize.height,
  };
}
