# wangEditor 超链接图片 插件

## 介绍

[wangEditor](https://www.wangeditor.com/) 超链接图片 插件。

## 安装

```shell
yarn add wang-editor-plugin-anchor-image
```

## 使用

【注意】该文档要求 `@wangeditor/editor` 版本 `>=5.1.16`

### 注册到编辑器

```js
import { Boot } from '@wangeditor/editor'
import AnchorImageModule from 'wang-editor-plugin-anchor-image'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(AnchorImageModule)
```

### 配置

编辑器配置

```ts
import { IEditorConfig } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = {
  // 在编辑器中，点击选中“图片”节点时，要弹出的菜单
  'anchor-image': {
    image: {
      menuKeys: [
        'editAnchorImage', // 编辑图片属性
        'viewImageAnchor', // 新标签页打开图片超链接
        'anchorImageWidth30', // 图片宽度设置为页面的30%
        'anchorImageWidth50', // 图片宽度设置为页面的50% 
        'anchorImageWidth100', // 图片宽度设置为页面的100%
        'deleteAnchorImage', // 删除图片节点
      ], // “图片”菜单
    },
  },
  MENU_CONF: {
    uploadImage: { // 上传文件的接口地址
      server: 'http://127.0.0.1:3000/api/upload-video',
    },
  },

  // 其他...
}
```

工具栏配置

```ts
import { IToolbarConfig } from '@wangeditor/editor'

const toolbarConfig: Partial<IToolbarConfig> = {
  // 插入哪些菜单
  insertKeys: {
    index: 22,
    keys: [
      {
        key: 'group-anchor-image',
        title: '超链接图片',
        iconSvg: IMAGE_SVG,
        menuKeys: ['uploadAnchorImage', 'insertAnchorImage'], // “图片”菜单
      },
    ],
  },
  // 将原来的图片菜单隐藏掉
  excludeKeys: ['group-image'],

  // 其他...
}
```

然后创建编辑器和工具栏，会用到 `editorConfig` 和 `toolbarConfig` 。具体查看 wangEditor 文档。


### 显示 HTML

附件节点获取的 HTML 格式如下，可以直接显示。

```html
<a
  data-w-e-is-inline
  data-w-e-is-void
  data-w-e-type="anchor-image"
  href="https://some.web.com/anchor.html"
  target="_blank"
>
  <img
    data-w-e-type="anchor-image_image"
    src="https://some.web.com/some-pic.jpg"
    alt="file-name"
    data-href="https://some.web.com/dasdas.html"
    style="width: 50%"
  >
</a>
```
