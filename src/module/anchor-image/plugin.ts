import { IDomEditor } from '@wangeditor/core'
import { isInsertImageMenuDisabled } from './helper'
import uploadImages from './upload-images'

function withAnchorImage<T extends IDomEditor>(editor: T): T {
  const { isInline, isVoid, insertNode, insertData } = editor
  const newEditor = editor

  // 重写 isInline
  newEditor.isInline = (elem: any) => {
    const { type } = elem

    if (type === 'anchor-image') {
      return true
    }

    return isInline(elem)
  }

  // 重写 isVoid
  newEditor.isVoid = (elem: any) => {
    const { type } = elem

    if (type === 'anchor-image') {
      return true
    }

    return isVoid(elem)
  }

  // 重写 insertData - 粘贴图片、拖拽上传图片
  newEditor.insertData = (data: DataTransfer) => {
    if (isInsertImageMenuDisabled(newEditor)) {
      insertData(data)
      return
    }

    // 如有 text ，则优先粘贴 text
    const text = data.getData('text/plain')
    if (text) {
      insertData(data)
      return
    }

    // 获取文件
    const { files } = data
    if (files.length <= 0) {
      insertData(data)
      return
    }

    // 判断是否有图片文件（可能是其他类型的文件）
    const fileList = Array.prototype.slice.call(files)
    const _hasImageFiles = fileList.some(file => {
      const [mime] = file.type.split('/')
      return mime === 'image'
    })

    if (_hasImageFiles) {
      // 有图片文件，则上传图片
      uploadImages(editor, files)
    } else {
      // 如果没有， 则继续 insertData
      insertData(data)
    }
  }

  // 返回 editor ，重要！
  return newEditor
}

export default withAnchorImage
