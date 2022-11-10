import { Editor, Range, Transforms } from 'slate'
import { DomEditor, IDomEditor } from '@wangeditor/core'
import { ImageElement, ImageStyle } from '@/types'
import { replaceSymbols } from '@/utils/util'

const UPLOAD_MENU_KEY = 'uploadImage'
const EDIT_MENU_KEY = 'editImage'

async function check(
  menuKey: string,
  editor: IDomEditor,
  src: string,
  alt: string = '',
  href: string = ''
): Promise<boolean> {
  const { checkImage } = editor.getMenuConfig(menuKey)
  if (checkImage) {
    const res = await checkImage(src, alt, href)
    if (typeof res === 'string') {
      // 检验未通过，提示信息
      editor.alert(res, 'error')
      return false
    }
    if (res == null) {
      // 检验未通过，不提示信息
      return false
    }
  }

  return true
}

async function parseSrc(menuKey: string, editor: IDomEditor, src: string): Promise<string> {
  const { parseImageSrc } = editor.getMenuConfig(menuKey)
  if (parseImageSrc) {
    return await parseImageSrc(src)
  }
  return src
}

export async function insertImageNode(
  editor: IDomEditor,
  src: string,
  alt: string = '',
  href: string = ''
) {
  const res = await check(UPLOAD_MENU_KEY, editor, src, alt, href)
  if (!res) return // 检查失败，终止操作

  const parsedSrc = await parseSrc(UPLOAD_MENU_KEY, editor, src)

  // 新建一个 image node
  const image: ImageElement = {
    type: 'anchor-image',
    src: replaceSymbols(parsedSrc),
    href,
    alt,
    style: {},
    children: [{ text: '' }], // 【注意】void node 需要一个空 text 作为 children
  }

  // 如果 blur ，则恢复选区
  if (editor.selection === null) editor.restoreSelection()

  // 如果当前正好选中了图片，则 move 一下（如：连续上传多张图片时）
  if (DomEditor.getSelectedNodeByType(editor, 'anchor-image')) {
    editor.move(1)
  }

  if (isInsertImageMenuDisabled(editor)) return

  // 插入图片
  Transforms.insertNodes(editor, image)

  // 回调
  const { onInsertedImage } = editor.getMenuConfig(UPLOAD_MENU_KEY)
  if (onInsertedImage) onInsertedImage(image)
}

export async function updateImageNode(
  editor: IDomEditor,
  src: string,
  alt: string = '',
  href: string = '',
  style: ImageStyle = {}
) {
  const res = await check(EDIT_MENU_KEY, editor, src, alt, href)
  if (!res) return // 检查失败，终止操作

  const parsedSrc = await parseSrc(EDIT_MENU_KEY, editor, src)

  const selectedImageNode = DomEditor.getSelectedNodeByType(editor, 'anchor-image')
  if (selectedImageNode == null) return
  const { style: curStyle = {} } = selectedImageNode as ImageElement

  // 修改图片
  const nodeProps: Partial<ImageElement> = {
    src: parsedSrc,
    alt,
    href,
    style: {
      ...curStyle,
      ...style,
    },
  }
  Transforms.setNodes(editor, nodeProps, {
    match: n => DomEditor.checkNodeType(n, 'anchor-image'),
  })

  // 回调
  const imageNode = DomEditor.getSelectedNodeByType(editor, 'anchor-image')
  const { onUpdatedImage } = editor.getMenuConfig(EDIT_MENU_KEY)
  if (onUpdatedImage) onUpdatedImage(imageNode)
}

/**
 * 判断菜单是否要 disabled
 * @param editor editor
 */
export function isInsertImageMenuDisabled(editor: IDomEditor): boolean {
  const { selection } = editor
  if (selection == null) return true
  if (!Range.isCollapsed(selection)) return true // 选区非折叠，禁用

  const [match] = Editor.nodes(editor, {
    match: n => {
      const type = DomEditor.getNodeType(n)

      if (type === 'code') return true // 代码块
      if (type === 'pre') return true // 代码块
      if (type === 'link') return true // 链接
      if (type === 'list-item') return true // list
      if (type.startsWith('header')) return true // 标题
      if (type === 'blockquote') return true // 引用
      if (Editor.isVoid(editor, n)) return true // void

      return false
    },
    universal: true,
  })

  return !!match
}
