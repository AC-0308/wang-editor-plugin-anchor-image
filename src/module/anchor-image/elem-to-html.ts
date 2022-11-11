import { Element } from "slate";
import type { ImageElement } from "@/types";

function imageToHtml(elemNode: Element, childrenHtml: string): string {
  const { src, alt = "", href = "", style = {} } = elemNode as ImageElement;
  const { width = "", height = "" } = style;

  let styleStr = "";
  if (width) styleStr += `width: ${width};`;
  if (height) styleStr += `height: ${height};`;
  if (href) {
    return `<a data-w-e-is-inline data-w-e-is-void data-w-e-type="anchor-image" href="${href}" target="_blank"><img data-w-e-type="anchor-image_image" src="${src}" alt="${alt}" data-href="${href}" style="${styleStr}"/></a>`;
  } else {
    return `<img data-w-e-type="anchor-image" src="${src}" alt="${alt}" data-href="${href}" style="${styleStr}"/>`;
  }
}

export const anchorImageToHtmlConf = {
  type: "anchor-image",
  elemToHtml: imageToHtml,
};
