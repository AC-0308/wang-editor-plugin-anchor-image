import { Descendant } from "slate";
import { IDomEditor } from "@wangeditor/core";
import { ImageElement } from "../../types";
import $, { DOMElement, getStyleValue } from "../../utils/dom";

function parseAnchorImg(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): ImageElement {
  const $a_elem = $(elem);
  // @ts-ignore
  const $img_elem = $(elem.firstElementChild);
  let href = $a_elem.attr("href") || $img_elem.attr("data-href") || "";
  href = decodeURIComponent(href); // 兼容 V4

  return {
    type: "anchor-image",
    src: $img_elem.attr("src") || "",
    alt: $img_elem.attr("alt") || "",
    href,
    style: {
      width: getStyleValue($img_elem, "width"),
      height: getStyleValue($img_elem, "height"),
    },
    children: [{ text: "" }], // void node 有一个空白 text
  };
}
function parseDataImg(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): ImageElement {
  const $elem = $(elem);
  // @ts-ignore
  let href = $elem.attr("href") || $elem.attr("data-href") || "";
  href = decodeURIComponent(href); // 兼容 V4

  return {
    type: "anchor-image",
    src: $elem.attr("src") || "",
    alt: $elem.attr("alt") || "",
    href,
    style: {
      width: getStyleValue($elem, "width"),
      height: getStyleValue($elem, "height"),
    },
    children: [{ text: "" }], // void node 有一个空白 text
  };
}

// data-w-e-type 属性，原生组件留给自定义元素给，保证扩展性，自定义元素给了编辑器就不会用内置组件处理
export const parseAnchorImgConf = {
  selector: 'a[data-w-e-type="anchor-image"]',
  parseElemHtml: parseAnchorImg,
};
export const parseDataImgConf = {
  selector: 'img[data-w-e-type="anchor-image"]',
  parseElemHtml: parseDataImg,
};
export const parseOriginImgConf = {
  selector: "*:not(a) > img",
  parseElemHtml: parseDataImg,
};
