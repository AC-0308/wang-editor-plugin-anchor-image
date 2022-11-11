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
import HyperlinkImageModule, { IMAGE_SVG } from "../src/index";

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
  html: `<p><a data-w-e-is-inline data-w-e-is-void data-w-e-type="anchor-image" href="https://e.gitee.com/baicmotor/projects/351006/tests/test_cases" target="_blank"><img data-w-e-type="anchor-image_image" src="https://dev-beijing-zone-temporary.oss-cn-beijing.aliyuncs.com/20221111/8a8a80ea7fe48a8c01802193d40b0f45/1668132985873-785-Snipaste_2022-11-04_16-58-26.png" alt="Snipaste_2022-11-04_16-58-26.png" data-href="https://e.gitee.com/baicmotor/projects/351006/tests/test_cases" style=""/></a></p>`,
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
