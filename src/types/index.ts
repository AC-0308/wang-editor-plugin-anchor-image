export type EmptyText = {
  text: "";
};

export type ImageStyle = {
  width?: string;
  height?: string;
};

//
export type ImageElement = {
  type: "anchor-image";
  src: string;
  alt?: string;
  href?: string;
  style?: ImageStyle;
  children: EmptyText[];
};
