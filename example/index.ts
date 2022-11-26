/**
 * @description examples entry
 * @author wangfupeng
 */

import {
  Boot,
  createEditor,
  createToolbar,
  IEditorConfig,
} from "@wangeditor/editor";
import HyperlinkImageModule from "../src/index";
import {IMAGE_SVG} from "../src"

// @ts-ignore
Boot.registerModule(HyperlinkImageModule);

// i18nChangeLanguage('en')

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  onChange(editor) {
    const html = editor.getHtml();
    // @ts-ignore
    document.getElementById("text-html").value = html;
    // @ts-ignore
    document.getElementById("text-json").value = JSON.stringify(
      editor.children,
      null,
      2
    );
  },
  hoverbarKeys: {
    "anchor-image": {
      menuKeys: [
        "editAnchorImage",
        "viewImageAnchor",
        "anchorImageWidth30",
        "anchorImageWidth50",
        "anchorImageWidth100",
        "deleteAnchorImage",
      ], // “下载附件”菜单
    },
  },
  MENU_CONF: {
    uploadImage: {
      server: "http://127.0.0.1:3000/api/upload-video",
    },
  },
};

// 创建编辑器
const editor = createEditor({
  selector: "#editor-container",
  config: editorConfig,
  html: "",
});

const toolbar = createToolbar({
  editor,
  selector: "#toolbar-container",
  config: {
    insertKeys: {
      index: 22,
      keys: [
        {
          key: "group-anchor-image",
          title: "超链接图片",
          iconSvg: IMAGE_SVG,
          menuKeys: ["uploadAnchorImage", "insertAnchorImage"], // “上传附件”菜单
        },
      ],
    },
    excludeKeys: ["group-image"],
  },
});

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor;
// @ts-ignore
window.toolbar = toolbar;

function setOptions() {
  const selectDom = (document.getElementById('key') as HTMLSelectElement);
  selectDom.innerHTML = '';
  Object.keys(localStorage).forEach(key => {
    const option = document.createElement('option');
    option.setAttribute('value', key);
    option.innerText = key;
    selectDom.appendChild(option).value = key;
  });
}

setOptions();

(document.getElementById('getDetail') as HTMLButtonElement)
  .addEventListener('click', () => {
    setTimeout(() => {
      const key = (document.getElementById('key') as HTMLSelectElement).value
      editor.setHtml(localStorage.getItem(key) as string)
    }, 300)
  });

(document.getElementById('saveDetail') as HTMLButtonElement)
  .addEventListener('click', () => {
    const html = editor.getHtml();
    const key = Math.random().toString();
    localStorage.setItem(key, html);
    setOptions();
  })
