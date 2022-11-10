import { IUploadConfig } from '@wangeditor/core'
import { ImageElement } from '@/types'

type InsertFn = (src: string, alt: string, href: string) => void

export function genImageMenuConfig() {
  return {
    /**
     * 插入图片之后的回调
     * @param imageElem ImageElement
     */
    onInsertedImage(imageElem: ImageElement) {
      /*自定义*/
    },

    /**
     * 更新图片之后的回调
     * @param node image node
     */
    onUpdatedImage(node: ImageElement | null) {
      /*自定义*/
    },

    /**
     * 检查图片信息，支持 async fn
     * @param src image src
     * @param alt image alt
     * @param href image href
     */
    checkImage(src: string, alt: string, href: string): boolean | string | undefined {
      // 1. 返回 true ，说明检查通过
      // 2. 返回一个字符串，说明检查未通过，编辑器会阻止图片插入。会 alert 出错误信息（即返回的字符串）
      // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止图片插入
      return true
    },

    /**
     * parse image src
     * @param src image src
     * @returns new src
     */
    parseImageSrc(src: string): string {
      return src
    },
  }
}

// 在通用 uploadConfig 上，扩展 image 相关配置
export type IUploadConfigForImage = IUploadConfig & {
  allowedFileTypes?: string[]
  // 用户自定义插入图片
  customInsert?: (res: any, insertFn: InsertFn) => void
  // 用户自定义上传图片
  customUpload?: (files: File, insertFn: InsertFn) => void
  // base64 限制（单位 kb） - 小于 xxx 就插入 base64 格式
  base64LimitSize: number
  // 自定义选择图片，如图床
  customBrowseAndUpload?: (insertFn: InsertFn) => void
}

// 生成默认配置
export function genUploadImageConfig(): IUploadConfigForImage {
  return {
    server: '', // server API 地址，需用户配置

    fieldName: 'wangeditor-uploaded-image', // formData 中，文件的 key
    maxFileSize: 2 * 1024 * 1024, // 2M
    maxNumberOfFiles: 100, // 最多上传 xx 张图片
    allowedFileTypes: ['image/*'],
    meta: {
      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      // 例如：token: 'xxxxx', x: 100
    },
    metaWithUrl: false,
    // headers: {
    //   // 自定义 http headers
    //   // 例如：Accept: 'text/x-json', a: 100,
    // },
    withCredentials: false,
    timeout: 10 * 1000, // 10s

    onBeforeUpload: (files: any) => files, // 返回 false 则终止上传
    onProgress: (progress: number) => {
      /* on progress */
    },
    onSuccess: (file: any, res: any) => {
      /* on success */
    },
    onFailed: (file: any, res: any) => {
      console.error(`'${file.name}' upload failed`, res)
    },
    onError: (file: any, err: any, res: any) => {
      /* on error */
      /* on timeout */
      console.error(`'${file.name}' upload error`, res)
    },

    // 自定义插入图片，用户配置
    // customInsert: (res, insertFn) => {},

    // 自定义上传图片，用户配置
    // customUpload: (file, insertFn) => {},

    // 小于 xxx 就插入 base64
    base64LimitSize: 0,

    // 自定义选择，并上传图片，如：图床 （用户配置）
    // customBrowseAndUpload: insertFn => {},
  }
}
