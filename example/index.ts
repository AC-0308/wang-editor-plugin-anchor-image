/**
 * @description examples entry
 * @author wangfupeng
 */

import { Boot, createEditor, createToolbar, IEditorConfig } from '@wangeditor/editor'
import HyperlinkImageModule, { IMAGE_SVG } from '../src/index'

// @ts-ignore
Boot.registerModule(HyperlinkImageModule)

// i18nChangeLanguage('en')

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  onChange(editor) {
    const html = editor.getHtml()
    // @ts-ignore
    document.getElementById('text-html').value = html
    // @ts-ignore
    document.getElementById('text-json').value = JSON.stringify(editor.children, null, 2)
  },
  hoverbarKeys: {
    'anchor-image': {
      menuKeys: [
        'editAnchorImage',
        'viewImageAnchor',
        'anchorImageWidth30',
        'anchorImageWidth50',
        'anchorImageWidth100',
        'deleteAnchorImage',
      ], // “下载附件”菜单
    },
  },
  MENU_CONF: {
    uploadImage: {
      server: 'http://127.0.0.1:3000/api/upload-video',
    },
  },
}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  html: `<p>
      <!--<img
        data-w-e-type="anchor-image"
        src="http://127.0.0.1:3000/upload-files/wangeditor-uploaded-image-yam"
        alt=""
        data-href=""
        style=""
      />

      <img
        data-w-e-type="anchor-image"
        src="http://127.0.0.1:3000/upload-files/wangeditor-uploaded-image-8wa"
        alt=""
        data-href=""
        style=""
      />

      <a
        data-w-e-is-inline
        data-w-e-is-void
        data-w-e-type="anchor-image"
        href="asdasfasfas"
        target="_blank"
      >
        <img
          data-w-e-type="anchor-image_image"
          src="http://127.0.0.1:3000/upload-files/wangeditor-uploaded-image-qrc"
          alt=""
          data-href="asdasfasfas"
          style=""
        />
      </a>

      <img
        data-w-e-type="anchor-image"
        src="http://127.0.0.1:3000/upload-files/wangeditor-uploaded-image-puc"
        alt=""
        data-href=""
        style=""
      />
-->
      <img
        src="https://www.glitches.fun/assets/images/logos/frp.jpeg"
        alt=""
        style=""
      />
    </p>`,
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 22,
      keys: [
        {
          key: 'group-anchor-image',
          title: '超链接图片',
          iconSvg: IMAGE_SVG,
          menuKeys: ['uploadAnchorImage', 'insertAnchorImage'], // “上传附件”菜单
        },
      ],
    },
    excludeKeys: ['group-image'],
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
